import { ServiceComment } from "@/constants/api/response/serviceResponse";
import { Take } from "@/constants/db/take";
import { createCommentsHandleTransaction } from "@/hooks/prisma/services/comments/createCommentsHandleTransaction";
import { fetchComments } from "@/hooks/prisma/services/comments/fetchComments";
import commentsValidate from "@/utils/api/validate/comments";
import createCommentValidate from "@/utils/api/validate/createComments";
import { formatDateToYMD } from "@/utils/common/date";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import crypto from 'crypto';
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/service/comments:
 *   get:
 *     summary: 退職代行サービス コメント一覧取得API
 *     description: 退職代行サービス コメント一覧取得
 *     parameters:
 *      - in: query
 *        name: serviceId
 *        schema:
 *           type: string
 *        required: true
 *        description: サービスID
 *      - in: query
 *        name: p
 *        schema:
 *           type: string
 *        required: true
 *        description: ページ番号
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *　　　 400:
 *         description: バリデーションチェックエラー時のレスポンス
 * 　　　500:
 *         description: 退職代行サービス コメント一覧取得失敗時のレスポンス
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const params: URLSearchParams = request.nextUrl.searchParams;
    //TODO offsetとcurrentを設定しページ毎に取得できるよう修正
    const serviceId: string = params.get("serviceId") ?? "";
    const page: string | null = params.get("page");

    //バリデーションチェック
    let validateError = commentsValidate(serviceId);
    if (validateError) return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });

    let orderBy: any = {
        id: "asc"
    };

    const take: number = Take.COMMENTS;
    let skip: number = 0;

    if (params.has("p")) {
        let page = Number(params.get("p"));
        skip = (page - 1) * take;
    }

    let comments;
    try {
        const query: Prisma.commentsFindManyArgs<DefaultArgs> = {
            select: {
                comment_id: true,
                name: true,
                title: true,
                comment: true,
                rating: true,
                created_at: true,
                gender: true
            },
            where: {
                service_id: serviceId
            },
            orderBy: orderBy,
            take: take,
            skip: skip
        }

        comments = await fetchComments(query);
    } catch (error: any) {
        console.error("取得失敗時のサービスID", serviceId);
        console.error("コメント一覧の取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "コメント一覧の取得に失敗しました" }, { status: 400 });
    }

    let modifiedComments: ServiceComment[] = [];
    if (Array.isArray(comments)) {
        modifiedComments = comments.map(comment => ({
            commentId: comment.comment_id,
            name: comment.name,
            title: comment.title,
            comment: comment.comment,
            rating: comment.rating,
            createDay: formatDateToYMD(comment.created_at),
            gender: comment.gender
        }));
    }

    return NextResponse.json({
        comments: modifiedComments
    })
}

/**
 * @swagger
 * /api/service/comments:
 *   post:
 *     summary: 退職代行サービス コメント作成API
 *     description: 退職代行サービス コメント作成API
 *     requestBody:
 *       description: リクエストボディ
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceId:
 *                 type: string
 *               name:
 *                 type: string
 *               comment:
 *                 type: string
 *               rating:
 *                 type: integer
 *               title:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *       400:
 *         description: バリデーションチェックエラー時のレスポンス
 *       500:
 *         description: 退職代行サービス コメント一覧取得失敗時のレスポンス
 */

export async function POST(request: NextRequest): Promise<NextResponse> {
    const json = await request.json();

    //バリデーションチェック
    let validateError = createCommentValidate(json.serviceId, json.name, json.comment, json.rating, json.title, json.gender);
    if (validateError) return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });

    //サービスID
    const serviceId: string = json.serviceId;
    //コメントID
    const commentId: string = crypto.randomUUID();
    //現在時刻
    const now = new Date().toISOString();

    const selectUniqueQuery: Prisma.servicesFindUniqueArgs = {
        select: {
            service_id: true
        },
        where: {
            service_id: serviceId
        }
    }

    const createQuery: Prisma.commentsCreateArgs = {
        data: {
            service_id: serviceId,
            comment_id: commentId,
            name: json.name,
            comment: json.comment,
            rating: json.rating,
            title: json.title,
            gender: json.gender,
            created_at: now,
            updated_at: now
        }
    };

    try {
        await createCommentsHandleTransaction(selectUniqueQuery, createQuery);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ "msg": error.message }, { status: 500 });
    }

    return NextResponse.json({
        msg: "成功しました"
    })
}

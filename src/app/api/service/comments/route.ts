import { ServiceComment } from "@/constants/api/response/serviceResponse";
import { Take } from "@/constants/db/take";
import { fetchComments } from "@/hooks/prisma/services/comments/fetchComments";
import validate from "@/utils/api/validate/comments";
import { formatDateToYMD } from "@/utils/common/date";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/service/comments:
 *   get:
 *     summary: 退職代行サービス コメント一覧取得API
 *     description: 退職代行サービス コメント一覧取得
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *　　　 400:
           description: バリデーションチェックエラー時のレスポンス
 * 　　　500:
 *         description: 退職代行サービス コメント一覧取得失敗時のレスポンス
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const params: URLSearchParams = request.nextUrl.searchParams;
    //TODO offsetとcurrentを設定しページ毎に取得できるよう修正
    const serviceId: string = params.get("serviceId") ?? "";
    const page: string | null = params.get("page");

    //バリデーションチェック
    let validateError = validate(serviceId);
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
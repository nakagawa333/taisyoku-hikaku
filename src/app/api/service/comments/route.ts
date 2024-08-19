import { fetchComments } from "@/hooks/prisma/services/comments/fetchComments";
import validate from "@/utils/api/validate/comments";
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
    const serviceId: string = params.get("serviceId") ?? "";

    //バリデーションチェック
    let validateError = validate(serviceId);
    if (validateError) return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });

    let comments;
    try {
        const query: Prisma.commentsFindManyArgs<DefaultArgs> = {
            select: {
                comment_id: true,
                name: true,
                comment: true,
                rating: true,
                created_at: true
            },
            where: {
                service_id: serviceId
            }
        }

        comments = await fetchComments(query);
    } catch (error: any) {
        console.error("取得失敗時のサービスID", serviceId);
        console.error("コメント一覧の取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "コメント一覧の取得に失敗しました" }, { status: 400 });
    }

    //TODO 投稿日時をyyyy/mm/ddに変換
    let modifiedComments: any[] = [];
    if (Array.isArray(comments)) {
        modifiedComments = comments.map(comment => ({
            commentId: comment.comment_id,
            name: comment.name,
            comment: comment.comment,
            rating: comment.rating,
            createAt: comment.created_at
        }));
    }

    return NextResponse.json({
        comments: modifiedComments
    })
}
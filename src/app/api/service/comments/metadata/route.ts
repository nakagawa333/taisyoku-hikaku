import { countComments } from "@/hooks/prisma/services/comments/countComments";
import validate from "@/utils/api/validate/commentsMetadata";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/service/comments/metadata:
 *   get:
 *     summary: 退職代行サービス 口コミ全件取得API
 *     description: 退職代行サービス 口コミ全件取得
 *     parameters:
 *      - in: query
 *        name: serviceId
 *        schema:
 *           type: string
 *        required: true
 *        description: サービスID
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *　　　 400:
           description: バリデーションチェックエラー時のレスポンス
 * 　　　500:
 *         description: 退職代行サービス 口コミ一覧取得失敗時のレスポンス
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const params: URLSearchParams = request.nextUrl.searchParams;
    const serviceId: string = params.get("serviceId") ?? "";

    //バリデーションチェック
    let validateError: Joi.ValidationError | undefined = validate(serviceId);
    if (validateError) return NextResponse.json({ "msg": `バリデーションエラー: ${validateError.details[0].message}` }, { status: 400 });

    let totalCount: number = 0;
    try {
        const query: Prisma.commentsCountArgs<DefaultArgs> = {
            where: {
                service_id: serviceId
            }
        }

        totalCount = await countComments(query);
    } catch (error: any) {
        console.error("取得失敗時のサービスID", serviceId);
        console.error("口コミ一覧の取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "口コミ一覧の取得に失敗しました" }, { status: 500 });
    }

    const lastPage: number = Math.ceil(totalCount / 10);
    return NextResponse.json({
        totalCount: totalCount,
        lastPage: lastPage
    })
}
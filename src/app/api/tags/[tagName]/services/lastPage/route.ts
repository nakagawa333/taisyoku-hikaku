import { countServiceTags } from "@/hooks/prisma/serviceTags/countServiceTags";
import { fetchUniqueTags } from "@/hooks/prisma/tags/fetchUniqueTags";
import validate from "@/utils/api/validate/tagsOfServices";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/tags/{tagName}/services/lastPage:
 *   get:
 *     summary: タグ関連退職サービス一覧最終ページの取得API
 *     description: タグ関連退職サービス一覧最終ページの取得API
 *     parameters:
 *      - in: path
 *        name: tagName
 *        schema:
 *           type: string
 *        required: true
 *        description: タグ名
 * 
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 * 　　　500:   
 *         description: タグ関連退職サービス一覧取得失敗時のレスポンス
 */

export async function GET(request: NextRequest): Promise<NextResponse> {
    const url = new URL(request.url);
    const pathname: string = url.pathname;
    const splitPathName: string[] = pathname.split("/");
    //タグ名
    const tagName: string = decodeURIComponent(splitPathName[splitPathName.length - 3]);

    const validateError: Joi.ValidationError | undefined = validate(tagName);
    if (validateError) return NextResponse.json({ "msg": "タグ名は必須です" }, { status: 400 });

    let tag: any;
    try {
        const query = {
            select: {
                tag_id: true
            },
            where: {
                tag_name: tagName
            }
        }

        tag = await fetchUniqueTags(query);
    } catch (error: any) {
        console.error(`Error: ${error.message}\n${error.stack}`);
        return NextResponse.json(
            { "msg": 'タグ関連退職サービス情報の取得に失敗しました' }, { status: 500 }
        );
    }

    let tagsCount: number = 0;

    const where: any = {
        tags: {
            tag_id: tag.tag_id
        }
    }

    try {
        tagsCount = await countServiceTags(where);
    } catch (error: any) {
        console.error(error);
        console.error("タグ関連退職サービス情報のに失敗しました");
        return NextResponse.json(
            { "msg": 'タグ関連退職サービス情報の取得に失敗しました' }, { status: 500 }
        );
    }

    return NextResponse.json(
        {
            tagsCount: tagsCount,
            lastPage: Math.ceil(tagsCount / 10)
        }
    );
}
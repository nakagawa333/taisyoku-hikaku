/**
 * @swagger
 * /api/tags/:
 *   get:
 *     summary: タグ一覧取得API
 *     description: タグ一覧取得API
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 * 　　　500:   
 *         description: タグ関連退職サービス一覧取得失敗時のレスポンス
 */

import prisma from "@/libs/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest): Promise<NextResponse> {

    let tags: any;
    try {
        const query = {
            select: {
                tag_name: true,
                service_tags: {
                    select: {
                        tag_id: true
                    }
                }
            }
        }

        tags = await prisma.tags.findMany(query);

    } catch (error: any) {
        console.error(error);
        console.error("タグ一覧の取得に失敗しました");
        return NextResponse.json(
            { "msg": 'タグ一覧の取得に失敗しました' }, { status: 500 }
        );
    }

    const tagsResponse = tags.map((tag: any) => {
        return {
            tagName: tag.tag_name,
            count: tag.service_tags.length
        }
    })

    return NextResponse.json({
        "tagsResponse": tagsResponse
    })
}

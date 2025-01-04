/**
 * @swagger
 * /api/ranking/services/metadata:
 *   get:
 *     summary: 退職代行サービス ランキング全件取得API
 *     description: 退職代行サービス ランキング全件取得取得
 *     parameters:
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *　　　 400:
           description: バリデーションチェックエラー時のレスポンス
 * 　　　500:
 *         description: 退職代行サービス ランキング全件取得失敗時のレスポンス
 */

import { Take } from "@/constants/db/take";
import { countRankingServices } from "@/hooks/prisma/ranking/services/countRankingServices";
import { NextResponse } from "next/server";

export async function GET() {
    let totalCount: number = 0;

    try {
        const query = {

        }

        totalCount = await countRankingServices(query);
    } catch (error: any) {
        console.error("ランキングサービスの取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "ランキングサービスの取得に失敗しました" }, { status: 500 });
    }

    const lastPage: number = Math.ceil(totalCount / Take.RANKING_SERVICES);
    return NextResponse.json({
        totalCount: totalCount,
        lastPage: lastPage
    })
}
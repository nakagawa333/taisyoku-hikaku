import prisma from "@/libs/prisma/prismaClient";

/**
 * ランキング順の退職代行サービステーブルからデータを取得する
 * @param query クエリ
 * @returns ランキング順の退職代行サービス一覧
 */
export async function fetchRankingServices(query: any) {
    return await prisma.ranking_services.findMany(query);
}
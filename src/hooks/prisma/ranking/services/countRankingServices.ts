import prisma from "@/libs/prisma/prismaClient";
import { Prisma } from "@prisma/client";

/**
 * ランキングサービスの合計を取得する
 * @param query クエリ
 * @returns ランキングサービスの合計
 */
export async function countRankingServices(query: Prisma.ranking_servicesCountArgs) {
    return await prisma.ranking_services.count(query);
}
import prisma from "@/libs/prisma/prismaClient";
import { Prisma, services } from "@prisma/client";

/**
 * 退職代行サービステーブルから一つのデータを取得する
 * @param query クエリ
 * @returns 退職代行サービス
 */
export async function fetchUniqueService(query: Prisma.servicesFindUniqueArgs): Promise<services | null> {
    return await prisma.services.findUnique(query);
}
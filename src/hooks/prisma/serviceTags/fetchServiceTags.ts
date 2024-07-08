import prisma from "@/libs/prisma/prismaClient";

/**
 * タグ関連サービステーブルからデータを取得する
 * @param query クエリ
 * @returns タグ一覧
 */
export async function fetchServiceTags(query: any) {
    return await prisma.service_tags.findMany(query);
}
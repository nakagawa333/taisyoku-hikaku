import prisma from "@/libs/prisma/prismaClient";

/**
 * タグテーブルからデータを取得する
 * @param query クエリ
 * @returns タグ
 */
export async function fetchUniqueTags(query: any) {
    return await prisma.tags.findUnique(query);
}
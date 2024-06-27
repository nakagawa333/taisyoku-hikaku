import prisma from "@/libs/prisma/prismaClient";

/**
 * タグテーブルからデータを取得する
 * @param query クエリ
 * @returns タグ一覧
 */
export async function fetchTags(query:any){
    return await prisma.tags.findMany(query);
}
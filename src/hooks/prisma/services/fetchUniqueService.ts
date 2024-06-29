import prisma from "@/libs/prisma/prismaClient";

/**
 * 退職代行サービステーブルから一つのデータを取得する
 * @param query クエリ
 * @returns 退職代行サービス
 */
export async function fetchUniqueService(query:any){
    return await prisma.services.findUnique(query);
}
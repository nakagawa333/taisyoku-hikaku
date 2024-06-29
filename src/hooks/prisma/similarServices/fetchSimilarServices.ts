import prisma from "@/libs/prisma/prismaClient";

/**
 * 退職代行類似サービステーブルからデータを取得する
 * @param query クエリ
 * @returns 退職代行類似サービス一覧
 */
export async function fetchSimilarServices(query:any){
    return await prisma.similar_services.findMany(query);
}
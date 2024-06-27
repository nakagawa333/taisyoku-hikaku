import prisma from "@/libs/prisma/prismaClient";

/**
 * 退職代行サービステーブルからデータを取得する
 * @param query クエリ
 * @returns 退職代行サービス一覧
 */
export async function fetchServices(query:any){
    return await prisma.services.findMany(query);
}
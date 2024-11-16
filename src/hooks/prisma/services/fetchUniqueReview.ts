import prisma from "@/libs/prisma/prismaClient";
import { Prisma, reviews } from "@prisma/client";

/**
 * レビューテーブルから一つのデータを取得する
 * @param query クエリ
 * @returns レビュー
 */
export async function fetchUniqueReview(query: Prisma.reviewsFindUniqueArgs): Promise<reviews | null> {
    return await prisma.reviews.findUnique(query);
}
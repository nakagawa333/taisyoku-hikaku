import prisma from "@/libs/prisma/prismaClient";
import { Prisma } from "@prisma/client";

/**
 * レビューの各満足度を投稿する
 * @param query クエリ
 * @returns 
 */
export async function createReviewsSatisfactionScore(query: Prisma.reviews_satisfaction_scoresCreateArgs) {
    return await prisma.reviews_satisfaction_scores.create(query);
}
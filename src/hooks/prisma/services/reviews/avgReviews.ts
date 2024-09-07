import prisma from "@/libs/prisma/prismaClient";
import { Prisma } from "@prisma/client";

/**
 * レビューの平均点を取得する
 * @param query 
 * @returns レビュー平均点
 */
export async function avgReviews(query: Prisma.ReviewsAggregateArgs): Promise<Prisma.GetReviewsAggregateType<Prisma.ReviewsAggregateArgs>> {
    return await prisma.reviews.aggregate(query);
}
import prisma from "@/libs/prisma/prismaClient";
import { Prisma } from "@prisma/client";

/**
 * 
 * @param query クエリ
 * @returns 
 */
export async function groupByReviews(query: Prisma.reviewsGroupByArgs
    & { orderBy: Prisma.reviewsOrderByWithAggregationInput | Prisma.reviewsOrderByWithAggregationInput[] }) {
    return await prisma.reviews.groupBy(query);
}
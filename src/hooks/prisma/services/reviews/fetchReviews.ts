import prisma from "@/libs/prisma/prismaClient";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

/**
 * 口コミを取得する
 * @param query クエリ
 * @returns 
 */
export async function fetchReviews(query: Prisma.reviewsFindManyArgs<DefaultArgs>) {
    return await prisma.reviews.findMany(query);
}
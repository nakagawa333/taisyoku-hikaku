import prisma from "@/libs/prisma/prismaClient";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

/**
 * 対象の口コミを取得する
 * @param query クエリ
 * @returns 
 */
export async function fetchReviewThrow(query: Prisma.reviewsFindUniqueOrThrowArgs<DefaultArgs>) {
    return await prisma.reviews.findUniqueOrThrow(query);
}
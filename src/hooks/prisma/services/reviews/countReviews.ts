import prisma from "@/libs/prisma/prismaClient";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

/**
 * 口コミの合計を取得する
 * @param query クエリ
 * @returns 口コミの合計
 */
export async function countReviews(query: Prisma.reviewsCountArgs<DefaultArgs>) {
    return await prisma.reviews.count(query);
}
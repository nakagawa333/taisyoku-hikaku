import prisma from "@/libs/prisma/prismaClient";

export async function fetchReviewRatings(query: any) {
    return await prisma.review_ratings.findMany(query);
}
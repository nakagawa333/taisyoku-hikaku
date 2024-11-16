import prisma from "@/libs/prisma/prismaClient";
import { Prisma } from "@prisma/client";

export async function createReviewsSatisfactionScores(query: Prisma.reviews_satisfaction_scoresCreateArgs): Promise<any> {
    return await prisma.reviews_satisfaction_scores.create(query);
}
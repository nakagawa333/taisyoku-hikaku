import prisma from "@/libs/prisma/prismaClient";
import { Prisma, reviews } from "@prisma/client";
import { fetchUniqueReview } from "../fetchUniqueReview";
import { createReviewsSatisfactionScores } from "./ratings/createReviewsSatisfactionScores";

export const createReviewsSatisfactionScoresHandleTransaction = async (
    selectUniqueQuery: Prisma.reviewsFindUniqueArgs,
    createQuery: Prisma.reviews_satisfaction_scoresCreateArgs) => {
    await prisma.$transaction(async (prisma: any) => {
        let review: reviews | null = null;

        try {
            review = await fetchUniqueReview(selectUniqueQuery);
        } catch (error: any) {
            console.error(error);
            throw new Error("口コミの取得に失敗しました");
        }

        if (!review) {
            throw new Error("対象のレビューが存在しません");
        }

        try {
            await createReviewsSatisfactionScores(createQuery);
        } catch (error: any) {
            console.error(error);
            throw new Error("口コミ評価の新規作成に失敗しました");
        }
    });
}
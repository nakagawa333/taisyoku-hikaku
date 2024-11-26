import prisma from "@/libs/prisma/prismaClient";
import { Prisma, PrismaClient, services } from "@prisma/client";
import * as runtime from '@prisma/client/runtime/library.js';

/**
 * 
 * @param selectUniqueQuery 
 * @param createQuery 
 */
export const createReviewsHandleTransaction = async (
    selectUniqueQuery: Prisma.servicesFindUniqueArgs,
    createQuery: Prisma.reviewsCreateArgs,
    createReviewsSatisfactionScoresQuery: Prisma.reviews_satisfaction_scoresCreateArgs
) => {
    let reviews;

    await prisma.$transaction(async (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => {
        let service: services | null = null;
        try {
            service = await prisma.services.findUnique(selectUniqueQuery);
        } catch (error: any) {
            console.error(error);
            throw new Error("退職代行サービスの取得に失敗しました");
        }

        if (!service) {
            throw new Error("対象の退職代行サービスが存在しません");
        }

        try {
            reviews = await prisma.reviews.create(createQuery);
        } catch (error: any) {
            console.error(error);
            throw new Error("口コミの新規作成に失敗しました");
        }

        if (!reviews) {
            throw new Error("対象の口コミが存在しません");
        }

        let reviewsSatisfactionScore;

        try {
            reviewsSatisfactionScore = await prisma.reviews_satisfaction_scores.create(createReviewsSatisfactionScoresQuery);
        } catch (error: any) {
            console.error(error);
            throw new Error("各満足度の作成に失敗しました");
        }
    });

    return reviews;
}
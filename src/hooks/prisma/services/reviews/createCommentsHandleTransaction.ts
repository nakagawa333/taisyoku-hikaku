import prisma from "@/libs/prisma/prismaClient";
import { Prisma, services } from "@prisma/client";
import { fetchUniqueService } from "../fetchUniqueService";
import { createReviews } from "./createReviews";

/**
 * 
 * @param selectUniqueQuery 
 * @param createQuery 
 */
export const createReviewsHandleTransaction = async (
    selectUniqueQuery: Prisma.servicesFindUniqueArgs,
    createQuery: Prisma.reviewsCreateArgs) => {
    await prisma.$transaction(async (prisma: any) => {
        let service: services | null = null;
        try {
            service = await fetchUniqueService(selectUniqueQuery);
        } catch (error: any) {
            console.error(error);
            throw new Error("退職代行サービスの取得に失敗しました");
        }

        if (!service) {
            throw new Error("対象の退職代行サービスが存在しません");
        }

        try {
            await createReviews(createQuery);
        } catch (error: any) {
            console.error(error);
            throw new Error("口コミの新規作成に失敗しました");
        }
    });
}
import prisma from "@/libs/prisma/prismaClient";
import { Prisma, services } from "@prisma/client";
import { fetchUniqueService } from "../fetchUniqueService";
import { createComments } from "./createComment";

export const createCommentsHandleTransaction = async (
    selectUniqueQuery: Prisma.servicesFindUniqueArgs,
    createQuery: Prisma.commentsCreateArgs) => {
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
            await createComments(createQuery);
        } catch (error: any) {
            console.error(error);
            throw new Error("コメントの新規作成に失敗しました");
        }
    });
}
import prisma from "@/libs/prisma/prismaClient";
import { Prisma } from "@prisma/client";

/**
 * コメントを新規作成する
 * @param query クエリ
 * @returns コメントの合計
 */
export async function createComments(query: Prisma.commentsCreateArgs): Promise<any> {
    return await prisma.comments.create(query);
}
import prisma from "@/libs/prisma/prismaClient";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export async function fetchComments(query: Prisma.commentsFindManyArgs<DefaultArgs>) {
    return await prisma.comments.findMany(query);
}
import prisma from "@/libs/prisma/prismaClient";

export async function countServiceTags(where: any) {
    return await prisma.service_tags.count();
}
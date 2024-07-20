import prisma from "@/libs/prisma/prismaClient";
import { Prisma, contact_information } from "@prisma/client";

export async function fetchContactInformationsService
    (query: Prisma.contact_informationFindManyArgs): Promise<contact_information[] | null> {
    return await prisma.contact_information.findMany(query);
}
import { Gender } from "@prisma/client";

export type ReviewFormState = {
    selectAgeId: number;
    nickName: string;
    gender: Gender;
    goodTitle: string;
    goodTitleDetail: string;
    concernTitle: string;
    concernTitleDetail: string;
    priceSatisfaction: number;
    speedSatisfaction: number;
    responseSatisfaction: number;
    costPerformanceSatisfaction: number;
    errorSatisfactionsMessage: string
};
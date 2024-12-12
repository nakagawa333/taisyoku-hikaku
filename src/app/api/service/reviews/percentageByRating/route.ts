import prisma from "@/libs/prisma/prismaClient";
import { PercentageByRating } from "@/types/api/response/reviewsResponse";
import percentageByRatingValidate from "@/utils/api/validate/percentageByRatingValidate";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const params: URLSearchParams = request.nextUrl.searchParams;
    const serviceId: string = params.get("serviceId") ?? "";

    //バリデーションチェック
    let validateError = percentageByRatingValidate(serviceId);
    if (validateError) return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });

    let groupByRes: any;
    try {
        const query: Prisma.reviewsFindUniqueArgs<DefaultArgs> = {
            select: {
                reviews_satisfaction_scores: {
                    select: {
                        comprehensive_evaluation: true
                    }
                }
            },
            where: {
                service_id: serviceId
            }
        }

        groupByRes = await prisma.reviews.findMany(query);
    } catch (error: any) {
        console.error("取得失敗時のサービスID", serviceId);
        console.error("口コミ一覧の取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "口コミ一覧の取得に失敗しました" }, { status: 500 });
    }

    groupByRes = groupByRes.filter((groupRes: any) => groupRes?.reviews_satisfaction_scores?.comprehensive_evaluation);

    let total: number = 0;
    const totalMap = new Map<number, number>();
    for (let res of groupByRes) {
        const comprehensiveEvaluation = Math.floor(res.reviews_satisfaction_scores.comprehensive_evaluation);
        let count: number | undefined = totalMap.get(comprehensiveEvaluation);
        if (count) {
            count += 1;
            totalMap.set(comprehensiveEvaluation, count);
        } else {
            totalMap.set(comprehensiveEvaluation, 1);
        }
        total += 1;
    }

    const percentageByRatings: PercentageByRating[] = [];

    for (let i = 5; i >= 1; i--) {
        let percentageByRating: PercentageByRating = {
            rating: i,
            count: 0,
            percentage: 0
        }

        const count = totalMap.get(i);
        if (count) {
            const percentage: number = (count / total) * 100;
            percentageByRating = {
                rating: i,
                count: count,
                percentage: percentage
            }
        }
        percentageByRatings.push(percentageByRating);
    }
    return NextResponse.json(percentageByRatings);
}
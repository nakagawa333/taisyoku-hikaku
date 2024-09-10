import { countReviews } from "@/hooks/prisma/services/reviews/countReviews";
import { groupByReviews } from "@/hooks/prisma/services/reviews/groupByReviews";
import { PercentageByRating } from "@/types/api/response/reviewsResponse";
import percentageByRatingValidate from "@/utils/api/validate/percentageByRatingValidate";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest): Promise<NextResponse> {
    const params: URLSearchParams = request.nextUrl.searchParams;
    const serviceId: string = params.get("serviceId") ?? "";

    //バリデーションチェック
    let validateError = percentageByRatingValidate(serviceId);
    if (validateError) return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });

    let totalCount: number = 0;
    try {
        const query: Prisma.reviewsCountArgs = {
            where: {
                service_id: serviceId
            }
        }

        totalCount = await countReviews(query);
    } catch (error: any) {
        console.error("取得失敗時のサービスID", serviceId);
        console.error("口コミ合計の取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "口コミ合計の取得に失敗しました" }, { status: 500 });
    }

    let groupByRes: any;
    try {
        const query: Prisma.reviewsGroupByArgs
            & { orderBy: Prisma.reviewsOrderByWithAggregationInput | Prisma.reviewsOrderByWithAggregationInput[] } = {
            by: ["rating"],
            _count: {
                _all: true,
                rating: true
            },
            where: {
                service_id: serviceId
            },
            orderBy: {
                rating: "desc"
            }
        }

        groupByRes = await groupByReviews(query);

    } catch (error: any) {
        console.error("取得失敗時のサービスID", serviceId);
        console.error("口コミ一覧の取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "口コミ一覧の取得に失敗しました" }, { status: 500 });
    }

    const groupByResMap = new Map<number, PercentageByRating>();
    for (let res of groupByRes) {
        const percentageByRating: PercentageByRating = {
            rating: res.rating,
            count: res._count.rating,
            percentage: (res._count.rating / totalCount) * 100
        }
        groupByResMap.set(res.rating, percentageByRating);
    }

    const percentageByRatings: PercentageByRating[] = [];

    for (let i = 1; i <= 5; i++) {
        let percentageByRating: PercentageByRating = {
            rating: i,
            count: 0,
            percentage: 0
        }

        if (groupByResMap.has(i)) {
            percentageByRating = groupByResMap.get(i)!;
        }
        percentageByRatings.push(percentageByRating);
    }

    return NextResponse.json(percentageByRatings);
}
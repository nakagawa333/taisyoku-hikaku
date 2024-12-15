/**
 * @swagger
 * /api/service/reviews/ratings:
 *   get:
 *     summary: レビュー一覧取得API
 *     description: 各評価毎のレビュー一覧を取得する
 *     parameters:
 *      - in: query
 *        name: serviceId
 *        schema:
 *           type: string
 *        required: true
 *        description: サービスID
 *      - in: query
 *        name: rating
 *        schema:
 *           type: string
 *        required: true
 *        description: 評価
 *      - in: query
 *        name: p
 *        schema:
 *           type: string
 *        required: false
 *        description: ページ番号(デフォルト:1)
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *　　　 400:
 *         description: バリデーションチェックエラー時のレスポンス
 * 　　　500:   
 *         description: レビュー一覧取得失敗時のレスポンス
 */

import { ServiceReview } from "@/constants/api/response/serviceResponse";
import { Take } from "@/constants/db/take";
import { fetchReviews } from "@/hooks/prisma/services/reviews/fetchReviews";
import validateReviewsRatings from "@/utils/api/validate/validateReviewsRatings";
import { formatDateToYMD } from "@/utils/common/date";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const params: URLSearchParams = request.nextUrl.searchParams;
    //サービスID
    const serviceId: string = params.get("serviceId") ?? "";
    //評価
    const rating: number = params.has("rating") ? Number(params.get("rating")) : 0;

    const validateError = validateReviewsRatings(serviceId, rating);
    if (validateError) return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });

    let orderBy: any = [
        { id: "desc" },
        { updated_at: "desc" }
    ];

    let take: number = Take.REVIEWS;
    if (params.has("limit")) {
        take = Number(params.get("limit"));
    }

    let reviews_query: Prisma.reviewsFindManyArgs<DefaultArgs> = {
        select: {
            review_id: true,
            name: true,
            created_at: true,
            gender: true,
            good_title: true,
            good_detail: true,
            concern_title: true,
            concern_detail: true,
            reviews_satisfaction_scores: {
                select: {
                    satisfaction_scores_id: true,
                    price_satisfaction: true,
                    speed_satisfaction: true,
                    response_satisfaction: true,
                    cost_performance_satisfaction: true,
                    comprehensive_evaluation: true
                }
            },
            contributor_years: {
                select: {
                    age: true
                }
            }
        },
        where: {
            service_id: serviceId,
            reviews_satisfaction_scores: {
                comprehensive_evaluation: {
                    gte: rating, //以上
                    lt: rating + 1, //以下
                }
            }
        },
        orderBy: orderBy,
        take: take
    }

    if (params.has("p")) {
        let page: number = Number(params.get("p"));
        let skip: number = (page - 1) * take;
        reviews_query.skip = skip;
    }

    let reviews: any;

    try {
        reviews = await fetchReviews(reviews_query);
    } catch (error: any) {
        console.error("取得失敗時のサービスID", serviceId);
        console.error(`Error: ${error.message}\n${error.stack}`);
        return NextResponse.json(
            { "msg": 'レビュー一覧取得に失敗しました', error: error.message }, { status: 500 }
        );
    }

    let modifiedReviews: ServiceReview[] = [];
    if (Array.isArray(reviews)) {
        modifiedReviews = reviews.map((review) => {
            return {
                reviewId: review.review_id,
                name: review.name,
                title: review.title,
                goodTitle: review.good_title,
                goodDetail: review.good_detail,
                concernTitle: review.concern_title,
                concernDetail: review.concern_detail,
                createDay: formatDateToYMD(review.created_at),
                gender: review.gender,
                price_satisfaction: review?.reviews_satisfaction_scores?.price_satisfaction,
                speed_satisfaction: review?.reviews_satisfaction_scores?.speed_satisfaction,
                response_satisfaction: review?.reviews_satisfaction_scores?.response_satisfaction,
                cost_performance_satisfaction: review?.reviews_satisfaction_scores?.cost_performance_satisfaction,
                comprehensive_evaluation: review?.reviews_satisfaction_scores?.comprehensive_evaluation,
                age: review.contributor_years.age
            }
        })
    }

    return NextResponse.json({
        reviews: modifiedReviews
    })
}
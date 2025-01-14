import { ServiceReview } from "@/constants/api/response/serviceResponse";
import { Take } from "@/constants/db/take";
import { createReviewsHandleTransaction } from "@/hooks/prisma/services/reviews/createCommentsHandleTransaction";
import { fetchReviews } from "@/hooks/prisma/services/reviews/fetchReviews";
import commentsValidate from "@/utils/api/validate/comments";
import createReviewsValidate from "@/utils/api/validate/createReviewsValidate";
import { formatDateToYMD } from "@/utils/common/date";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import crypto from 'crypto';
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/service/reviews:
 *   get:
 *     summary: 退職代行サービス 口コミ一覧取得API
 *     description: 退職代行サービス 口コミ一覧取得
 *     parameters:
 *      - in: query
 *        name: serviceId
 *        schema:
 *           type: string
 *        required: true
 *        description: サービスID
 *      - in: query
 *        name: p
 *        schema:
 *           type: string
 *        required: true
 *        description: ページ番号
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *　　　 400:
 *         description: バリデーションチェックエラー時のレスポンス
 * 　　　500:
 *         description: 退職代行サービス 口コミ一覧取得失敗時のレスポンス
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const params: URLSearchParams = request.nextUrl.searchParams;
    //TODO offsetとcurrentを設定しページ毎に取得できるよう修正
    const serviceId: string = params.get("serviceId") ?? "";

    //バリデーションチェック
    let validateError = commentsValidate(serviceId);
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
            service_id: serviceId
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
        console.error("口コミ一覧の取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "口コミ一覧の取得に失敗しました" }, { status: 400 });
    }

    let reviewIds: string[] = [];

    if (Array.isArray(reviews)) {
        reviewIds = reviews.map((review) => review.review_id);
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

/**
 * @swagger
 * /api/service/reviews:
 *   post:
 *     summary: 退職代行サービス 口コミ作成API
 *     description: 退職代行サービス 口コミ作成API
 *     requestBody:
 *       description: リクエストボディ
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceId:
 *                 type: string
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               goodTitle:
 *                 type: string 
 *               goodDetail:
 *                 type: string
 *               concernTitle:
 *                 type: string 
 *               concernDetail:
 *                 type: string
 *               priceSatisfaction:
 *                 type: number
 *               responseSatisfaction:
 *                 type: number
 *               costPerformanceSatisfaction:
 *                 type: number
 *               comprehensiveEvaluation:
 *                 type: number
  *               contributorYearsId:
 *                 type: number
 * 
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *       400:
 *         description: バリデーションチェックエラー時のレスポンス
 *       500:
 *         description: 退職代行サービス 口コミ作成失敗時のレスポンス
 */

export async function POST(request: NextRequest): Promise<NextResponse> {
    const json = await request.json();

    //バリデーションチェック
    let validateError = createReviewsValidate(json.serviceId, json.name,
        json.gender, json.goodTitle, json.concernTitle,
        json.priceSatisfaction,
        json.speedSatisfaction, json.responseSatisfaction, json.costPerformanceSatisfaction,
        json.comprehensiveEvaluation
    );
    if (validateError) return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });

    //サービスID
    const serviceId: string = json.serviceId;
    //口コミID
    const reviewId: string = crypto.randomUUID();

    //スコアID
    const satisfactionScoresId: string = crypto.randomUUID();
    //現在時刻
    const now = new Date().toISOString();

    const selectUniqueQuery: Prisma.servicesFindUniqueArgs = {
        select: {
            service_id: true
        },
        where: {
            service_id: serviceId
        }
    }

    const createReviewsQuery: Prisma.reviewsCreateArgs = {
        data: {
            service_id: serviceId,
            review_id: reviewId,
            name: json.name.trim(),
            gender: json.gender,
            good_title: json.goodTitle,
            good_detail: json.goodDetail,
            concern_title: json.concernTitle,
            concern_detail: json.concernDetail,
            created_at: now,
            updated_at: now,
            contributor_years_id: json.contributorYearsId
        }
    };

    const createReviewsSatisfactionScoresQuery: Prisma.reviews_satisfaction_scoresCreateArgs = {
        data: {
            satisfaction_scores_id: satisfactionScoresId,
            review_id: reviewId,
            price_satisfaction: json.priceSatisfaction,
            speed_satisfaction: json.speedSatisfaction,
            response_satisfaction: json.responseSatisfaction,
            cost_performance_satisfaction: json.costPerformanceSatisfaction,
            comprehensive_evaluation: json.comprehensiveEvaluation,
            created_at: now,
            updated_at: now,
        }
    }

    try {
        await createReviewsHandleTransaction(selectUniqueQuery, createReviewsQuery, createReviewsSatisfactionScoresQuery);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ "msg": error.message }, { status: 500 });
    }

    return NextResponse.json({
        msg: "成功しました"
    })
}

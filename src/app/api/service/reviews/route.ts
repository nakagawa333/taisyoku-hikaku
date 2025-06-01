import { ServiceReview } from "@/constants/api/response/serviceResponse";
import { HttpStatus } from "@/constants/common/httpStatus";
import { Take } from "@/constants/db/take";
import { createReviewsHandleTransaction } from "@/hooks/prisma/services/reviews/createCommentsHandleTransaction";
import { fetchReviews } from "@/hooks/prisma/services/reviews/fetchReviews";
import supabase from "@/libs/supabase/supabaseClient";
import commentsValidate from "@/utils/api/validate/comments";
import createReviewsValidate from "@/utils/api/validate/createReviewsValidate";
import { formatDateToYMD } from "@/utils/common/date";
import { getUser } from "@/utils/common/getUser";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { UserResponse } from "@supabase/supabase-js";
import axios from "axios";
import crypto from 'crypto';
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
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
            user_id: true,
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

    //ユーザー情報取得
    const userId: string | undefined = await getUser(request);

    let reviewIds: string[] = [];

    if (Array.isArray(reviews)) {
        reviewIds = reviews.map((review) => review.review_id);
    }

    let modifiedReviews: ServiceReview[] = [];
    if (Array.isArray(reviews)) {
        modifiedReviews = reviews.map((review) => {
            const isUser: boolean = (userId && userId === review.user_id) ? true : false;
            return {
                reviewId: review.review_id,
                name: review.name,
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
                age: review.contributor_years.age,
                isUser: isUser
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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *               - name
 *               - gender
 *               - goodTitle
 *               - concernTitle
 *               - priceSatisfaction
 *               - speedSatisfaction
 *               - responseSatisfaction
 *               - costPerformanceSatisfaction
 *               - comprehensiveEvaluation
 *               - contributorYearsId
 *             properties:
 *               serviceId:
 *                 type: string
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 50
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               goodTitle:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *               goodDetail:
 *                 type: string
 *                 maxLength: 1000
 *               concernTitle:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *               concernDetail:
 *                 type: string
 *                 maxLength: 1000
 *               priceSatisfaction:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               speedSatisfaction:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               responseSatisfaction:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               costPerformanceSatisfaction:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comprehensiveEvaluation:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               contributorYearsId:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       201:
 *         description: 口コミ作成成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 reviewId:
 *                   type: string
 *       400:
 *         description: リクエストが不正
 *       404:
 *         description: サービスが存在しない
 *       500:
 *         description: サーバー内部エラー
 */

export async function POST(request: NextRequest): Promise<NextResponse> {
    const headers = new Headers(request.headers);
    const authorization = headers.get("Authorization");
    const token = authorization?.replace("Bearer ", "");

    const verifyURL: string = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const xAuthToken = headers.get("X-Auth-Token");

    try {
        const body = {
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: xAuthToken,
        }
        const res = await axios.post(verifyURL, body);

        if (!res?.data.success) {
            return NextResponse.json(
                { "msg": "認証に失敗しました" },
                { status: HttpStatus.FORBIDDEN }
            );
        }

    } catch (err: any) {
        console.error('Turnstile検証エラー:', err)
        return NextResponse.json(
            { error: '認証処理に失敗しました' },
            { status: HttpStatus.INTERNAL_SERVER_ERROR }
        )
    }

    //アクセストークン
    const accessToken: RequestCookie | undefined = request.cookies.get('sb-access-token');

    //リフレッシュトークン
    const refreshToken: RequestCookie | undefined = request.cookies.get('sb-refresh-token');

    if (!accessToken || !refreshToken) {
        console.error('ユーザー情報が存在しません');
        return NextResponse.json(
            { error: 'ユーザー情報が存在しません' },
            { status: HttpStatus.BAD_REQUEST }
        )
    }

    //ユーザー情報取得
    const user: UserResponse = await supabase.auth.getUser(accessToken.value);
    if (user && user.error) {
        console.error('ユーザー情報の取得に失敗しました', user.error);
        return NextResponse.json(
            { error: 'ユーザー情報の取得に失敗しました' },
            { status: HttpStatus.INTERNAL_SERVER_ERROR }
        )
    }

    if (!user.data || !user.data.user) {
        console.error('ユーザー情報が存在しません');
        return NextResponse.json(
            { error: 'ユーザー情報が存在しません' },
            { status: HttpStatus.BAD_REQUEST }
        )
    }

    let json: any = {};

    try {
        json = await request.json();
    } catch (err: any) {
        return NextResponse.json(
            { error: '不正なJSON形式です' },
            { status: HttpStatus.BAD_REQUEST }
        )
    }

    //バリデーションチェック
    let validateError = createReviewsValidate(json.serviceId, json.name,
        json.gender, json.goodTitle, json.concernTitle,
        json.priceSatisfaction,
        json.speedSatisfaction, json.responseSatisfaction, json.costPerformanceSatisfaction,
        json.comprehensiveEvaluation
    );
    if (validateError) return NextResponse.json({ error: validateError.details[0].message }, { status: HttpStatus.BAD_REQUEST });

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

    const selectReviewUniqueQuery: Prisma.reviewsFindUniqueArgs = {
        select: {
            review_id: true
        },
        where: {
            user_id: user.data.user.id,
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
            contributor_years_id: json.contributorYearsId,
            user_id: user.data.user.id
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
        await createReviewsHandleTransaction(selectUniqueQuery, createReviewsQuery, selectReviewUniqueQuery, createReviewsSatisfactionScoresQuery);
    } catch (error: any) {
        console.error(error);

        if (error.message === "Service not found") {
            return NextResponse.json(
                { error: 'サービスが存在しない' },
                { status: HttpStatus.NOT_FOUND }
            );
        }

        return NextResponse.json(
            { error: 'サーバー内部エラー' },
            { status: HttpStatus.INTERNAL_SERVER_ERROR }
        );
    }

    return NextResponse.json(
        { msg: "口コミ作成成功", reviewId: reviewId },
        { status: HttpStatus.CREATED }
    )
}

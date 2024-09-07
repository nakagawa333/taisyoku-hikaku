import { ServiceReview } from "@/constants/api/response/serviceResponse";
import { Take } from "@/constants/db/take";
import { createReviewsHandleTransaction } from "@/hooks/prisma/services/reviews/createCommentsHandleTransaction";
import { fetchReviews } from "@/hooks/prisma/services/reviews/fetchReviews";
import commentsValidate from "@/utils/api/validate/comments";
import createCommentValidate from "@/utils/api/validate/createComments";
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

    let query: Prisma.reviewsFindManyArgs<DefaultArgs> = {
        select: {
            review_id: true,
            name: true,
            title: true,
            review: true,
            rating: true,
            created_at: true,
            gender: true
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
        query.skip = skip;
    }

    let reviews;
    try {
        reviews = await fetchReviews(query);
    } catch (error: any) {
        console.error("取得失敗時のサービスID", serviceId);
        console.error("口コミ一覧の取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "口コミ一覧の取得に失敗しました" }, { status: 400 });
    }

    let modifiedReviews: ServiceReview[] = [];
    if (Array.isArray(reviews)) {
        modifiedReviews = reviews.map(review => ({
            reviewId: review.review_id,
            name: review.name,
            title: review.title,
            review: review.review,
            rating: review.rating,
            createDay: formatDateToYMD(review.created_at),
            gender: review.gender
        }));
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
 *               review:
 *                 type: string
 *               rating:
 *                 type: integer
 *               title:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *       400:
 *         description: バリデーションチェックエラー時のレスポンス
 *       500:
 *         description: 退職代行サービス 口コミ一覧取得失敗時のレスポンス
 */

export async function POST(request: NextRequest): Promise<NextResponse> {
    const json = await request.json();

    //バリデーションチェック
    let validateError = createCommentValidate(json.serviceId, json.name, json.review, json.rating, json.title, json.gender);
    if (validateError) return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });

    //サービスID
    const serviceId: string = json.serviceId;
    //口コミID
    const reviewId: string = crypto.randomUUID();
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

    const createQuery: Prisma.reviewsCreateArgs = {
        data: {
            service_id: serviceId,
            review_id: reviewId,
            name: json.name.trim(),
            review: json.review.trim(),
            rating: json.rating,
            title: json.title.trim(),
            gender: json.gender,
            created_at: now,
            updated_at: now
        }
    };

    try {
        await createReviewsHandleTransaction(selectUniqueQuery, createQuery);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ "msg": error.message }, { status: 500 });
    }

    return NextResponse.json({
        msg: "成功しました"
    })
}

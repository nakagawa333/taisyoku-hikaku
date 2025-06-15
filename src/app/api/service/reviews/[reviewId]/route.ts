import { fetchReviewThrow } from "@/hooks/prisma/services/reviews/fetchReviewThrow";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/service/reviews/{reviewId}:
 *   get:
 *     summary: 口コミ詳細取得API
 *     description: IDに紐づく口コミの詳細情報を取得する
 *     parameters:
 *      - in: path
 *        name: reviewId
 *        schema:
 *           type: string
 *        required: true
 *        description: タグ名
 * 
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 * 　　　500:   
 *         description: 口コミ詳細取得A失敗時のレスポンス
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const url = new URL(request.url);
    const pathname: string = url.pathname;
    const splitPathName: string[] = pathname.split("/");

    //レビューID
    const reviewId: string = decodeURIComponent(splitPathName[splitPathName.length - 1]);

    let review_query: Prisma.reviewsFindUniqueOrThrowArgs<DefaultArgs> = {
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
            review_id: reviewId
        }
    }

    let review: any;

    try {
        //対象の口コミを取得する
        review = await fetchReviewThrow(review_query);
    } catch (error: any) {
        console.error("取得失敗時のレビューID", reviewId);
        console.error("口コミ詳細取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "口コミ詳細取得に失敗しました" }, { status: 400 });
    }


    return NextResponse.json(review);
}
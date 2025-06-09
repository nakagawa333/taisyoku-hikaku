import prisma from "@/libs/prisma/prismaClient";
import { Prisma, PrismaClient } from "@prisma/client";
import * as runtime from '@prisma/client/runtime/library.js';

/**
 * 口コミを削除する
 * @param reviewsSatisfactionScoresUniqueQuery 口コミの評価の取得クエリ
 * @param selectReviewUniqueQuery 口コミ取得クエリ
 * @param deleteReviewUniqueQuery 口コミ削除クエリ
 * @param deleteReviewsSatisfactionScoresQuery 口コミの評価の削除クエリ
 * @return {void}
 */
export const deleteReviewHandleTransaction = async (
    reviewsSatisfactionScoresUniqueQuery: Prisma.reviews_satisfaction_scoresFindUniqueArgs,
    selectReviewUniqueQuery: Prisma.reviewsFindUniqueArgs,
    deleteReviewQuery: Prisma.reviewsDeleteArgs,
    deleteReviewsSatisfactionScoresQuery: Prisma.reviews_satisfaction_scoresDeleteArgs
) => {

    await prisma.$transaction(async (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => {
        let selectReviewsSatisfactionScores;

        try {
            selectReviewsSatisfactionScores = await prisma.reviews_satisfaction_scores.findUnique(reviewsSatisfactionScoresUniqueQuery);
        } catch (error: any) {
            throw new Error("対称の口コミの各評価が存在しません");
        }

        let selectReviews;

        //既にユーザーが口コミを投稿しているかを確認
        try {
            selectReviews = await prisma.reviews.findUnique(selectReviewUniqueQuery);
        } catch (error: any) {
            console.error(error);
            throw new Error("口コミの取得に失敗しました");
        }

        //ユーザーIDに紐づく口コミが存在する場合
        if (!selectReviews) {
            throw new Error("対称の口コミが存在しません");
        }

        let reviewsSatisfactionScores: any;
        try {
            reviewsSatisfactionScores = await prisma.reviews_satisfaction_scores.delete(deleteReviewsSatisfactionScoresQuery);
        } catch (error: any) {
            console.error(error);
            throw new Error("口コミ評価の削除に失敗しました");
        }

        if (!reviewsSatisfactionScores) {
            throw new Error("口コミ評価の削除に失敗しました");
        }

        let review;
        try {
            review = await prisma.reviews.delete(deleteReviewQuery);
        } catch (error: any) {
            console.error(error);
            throw new Error("口コミの削除に失敗しました");
        }

        if (!review) {
            throw new Error("口コミの削除に失敗しました");
        }

    });
}
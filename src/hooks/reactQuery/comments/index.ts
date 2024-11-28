"use client";
import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { Take } from "@/constants/db/take";
import { PercentageByRating } from "@/types/api/response/reviewsResponse";
import { MutationFunction, useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

export const useQueryReviews = () => {

    /**
     * 口コミ一覧を取得する
     * @param serviceId サービスID
     * @returns 
     */

    const fetchReviews = (serviceId: string, limit: number = Take.REVIEWS, page?: string) => {
        let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICEREVIEWS}?serviceId=${serviceId}&limit=${limit}`;

        if (page) {
            reqUrl += `&p=${page}`;
        }

        return useQuery({
            queryKey: [ReactQueryKeys.SERVICEREVIEWS],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICEREVIEWS}?serviceId=${serviceId}&p=${page}`
                let res = await axios.get(reqUrl);
                return res.data;
            }
        })
    }

    /**
     * 口コミのメタデータ(全体の件数、最終ページ)を取得する
     * @param serviceId サービスID
     * @returns totalCount:全体の件数 lastPage:最終ページ
     */
    const fetchReviewsMetaData = (serviceId: string) => {
        return useQuery({
            queryKey: [ReactQueryKeys.SERVICEREVIEWSMETADATA],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICEREVIEWSMETADATA}?serviceId=${serviceId}`
                let res = await axios.get(reqUrl);
                return res.data;
            }
        })
    }

    /**
     * 各評価毎の全体件数に対する割合を取得する
     * @param serviceId サービスID
     * @returns 
     */
    const fetchPercentageByRatings = (serviceId: string): UseQueryResult<PercentageByRating> => {
        return useQuery({
            queryKey: [ReactQueryKeys.PERCENTAGEBYRATINGS],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.PERCENTAGEBYRATINGS}?serviceId=${serviceId}`
                let res = await axios.get(reqUrl);
                return res.data;
            }
        })
    }

    /**
     * 口コミを新規作成する
     * @param serviceId サービスID
     * @param name ニックネーム
     * @param goodTitle 良い点
     * @param goodDetail 良い点詳細
     * @param concernTitle 悪い点
     * @param concernDetail 悪い詳細
     * @param gender 性別
     * @param priceSatisfaction 価格の満足度
     * @param 
     * @param title タイトル
     * @param review レビュー
     * @returns 
     */
    const createReview = () => {
        const mutationFn: MutationFunction<any, any> = async ({
            serviceId, name, goodTitle, goodDetail, concernTitle, concernDetail,
            gender, priceSatisfaction, speedSatisfaction, responseSatisfaction, costPerformanceSatisfaction,
            comprehensiveEvaluation, contributorYearsId
        }) => {
            const reqUrl = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICEREVIEWS}`;
            const data = {
                serviceId,
                name,
                goodTitle,
                goodDetail,
                concernTitle,
                concernDetail,
                gender,
                priceSatisfaction,
                speedSatisfaction,
                responseSatisfaction,
                costPerformanceSatisfaction,
                comprehensiveEvaluation,
                contributorYearsId
            };
            const res = await axios.post(reqUrl, data);
            return res.data;
        };
        return useMutation({
            mutationFn: mutationFn
        });
    };

    return [{ fetchReviews, fetchReviewsMetaData, fetchPercentageByRatings, createReview }]
}
"use client";
import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { Take } from "@/constants/db/take";
import { MutationFunction, useMutation, useQuery } from "@tanstack/react-query";
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
     * 口コミを新規作成する
     * @param serviceId サービスID
     * @param name 名前
     * @param rating 評価
     * @param gender 性別
     * @param title タイトル
     * @param review レビュー
     * @returns 
     */
    const createReview = () => {

        const mutationFn: MutationFunction<any, any> = async ({
            serviceId, name, rating, gender, title, review
        }) => {
            const reqUrl = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICEREVIEWS}`;
            const data = {
                serviceId,
                name,
                rating,
                gender,
                title,
                review
            };
            const res = await axios.post(reqUrl, data);
            return res.data;
        };
        return useMutation({
            mutationFn: mutationFn
        });
    };

    return [{ fetchReviews, fetchReviewsMetaData, createReview }]
}
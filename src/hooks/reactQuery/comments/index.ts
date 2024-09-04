"use client";
import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { MutationFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useQueryComments = () => {
    const queryClient = useQueryClient();

    /**
     * 口コミ一覧を取得する
     * @param serviceId サービスID
     * @returns 
     */

    //TODO offsetとcurrentを設定しページ毎に取得できるよう修正
    const fetchComments = (serviceId: string, page: string) => {
        return useQuery({
            queryKey: [ReactQueryKeys.SERVICECOMMENTS],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICECOMMENTS}?serviceId=${serviceId}&p=${page}`
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
    const fetchCommentsMetaData = (serviceId: string) => {
        return useQuery({
            queryKey: [ReactQueryKeys.SERVICECOMMENTSMETADATA],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICECOMMENTSMETADATA}?serviceId=${serviceId}`
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
    const createComment = () => {

        const mutationFn: MutationFunction<any, any> = async ({
            serviceId, name, rating, gender, title, review
        }) => {
            const reqUrl = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICECOMMENTS}`;
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

    return [{ fetchComments, fetchCommentsMetaData, createComment }]
}
"use client";
import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useQueryComments = () => {

    /**
     * コメント一覧を取得する
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
     * コメントのメタデータ(全体の件数、最終ページ)を取得する
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

    //TODO コメントを新規作成できるように修正

    const createComment = (serviceId: string) => {

    }

    return [{ fetchComments, fetchCommentsMetaData, createComment }]
}
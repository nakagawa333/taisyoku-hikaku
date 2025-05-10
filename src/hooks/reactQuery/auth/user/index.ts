import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * 認証情報取得
 * @returns 
 */
export const useQueryAuthUser = () => {

    /**
     * ログイン済みユーザー情報を取得する
     * @returns 
     */
    const useFetchAuthUser = () => {
        return useQuery({
            queryKey: [ReactQueryKeys.AUTH_USER],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.AUTH_USER}`;
                let res = await axios.get(reqUrl);
                return res.data;
            }
        })
    }

    /**
     * ログイン済であるかを取得する
     * @returns 
     */
    const useAuthState = () => {
        return useQuery({
            queryKey: [ReactQueryKeys.AUTH_STATE],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.AUTH_STATE}`;
                let res = await axios.get(reqUrl);
                return res.data;
            }
        })
    }

    return { useFetchAuthUser, useAuthState }
}
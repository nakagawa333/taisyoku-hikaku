import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { MutationFunction, useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

/**
 * 認証情報関連
 * @returns 
 */
export const useQueryAuth = () => {

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

    /**
     * 認証用のマジックリンクを送信する
     * @returns 
     */
    const useQuerySendMagiclink = () => {
        const mutationFn: MutationFunction<any, any> = async (data: any) => {
            let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.AUTH_SEND_MAGICLINK}`;

            const config: AxiosRequestConfig = {
                headers: {
                    "X-Auth-Token": data.token
                }
            }

            const reqData = {
                email: data.email
            }

            let res = await axios.post(reqUrl, reqData, config);
            return res.data;
        }

        return useMutation({
            mutationFn: mutationFn
        })
    }

    return { useFetchAuthUser, useAuthState, useQuerySendMagiclink }
}
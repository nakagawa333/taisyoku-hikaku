import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

    return { useFetchAuthUser }
}
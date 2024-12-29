import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRankingServices = () => {
    const fetchRankingServices = () => {
        return useQuery({
            queryKey: [ReactQueryKeys.RANKINGSERVICES],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.RANKINGSERVICES}`
                let res = await axios.get(reqUrl);
                return res.data;
            }
        })
    }

    return {
        fetchRankingServices
    }
}
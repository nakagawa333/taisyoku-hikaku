import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { Take } from "@/constants/db/take";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRankingServices = () => {
    const fetchRankingServices = (limit: number = Take.RANKING_SERVICES, page?: string) => {
        return useQuery({
            queryKey: [ReactQueryKeys.RANKINGSERVICES],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.RANKINGSERVICES}?limit=${limit}`

                if (page) {
                    reqUrl += `&p=${page}`;
                }

                let res = await axios.get(reqUrl);
                return res.data;
            }
        })
    }

    const fetchRankingServicesMetadata = () => {
        return useQuery({
            queryKey: [ReactQueryKeys.RANKINGSERVICESMETADATA],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.RANKINGSERVICESMETADATA}`
                let res = await axios.get(reqUrl);
                return res.data;
            }
        })
    }

    return {
        fetchRankingServices, fetchRankingServicesMetadata
    }
}
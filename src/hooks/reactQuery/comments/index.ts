"use client";
import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useComments = () => {
    const fetchComments = (serviceId: string) => {
        return useQuery({
            queryKey: [ReactQueryKeys.SERVICECOMMENTS],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICECOMMENTS}?serviceId=${serviceId}`
                let res = await axios.get(reqUrl);
                return res.data;
            }
        })
    }

    return [{ fetchComments }]
}
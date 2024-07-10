"use client";
import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

export const useTagsOfServices = () => {
    const fetchTagsOfServices = (tagName: string) => {
        return useQuery({
            queryKey: [ReactQueryKeys.TAGSOFSERVICES],
            queryFn: async () => {
                let res = await axios.get(`${process.env.NEXT_PUBLIC_URL}${Endpoints.TAGS}${tagName}/services/`);
                return res.data;
            },
            staleTime: 0
        })
    }

    return [{ fetchTagsOfServices }]
}
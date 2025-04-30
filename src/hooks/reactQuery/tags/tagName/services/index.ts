"use client";
import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { ReadonlyURLSearchParams } from "next/navigation";

export const useQueryTagsOfServices = () => {
    const fetchTagsOfServices = (tagName: string, searchParams: ReadonlyURLSearchParams | null) => {
        return useQuery({
            queryKey: [ReactQueryKeys.TAGSOFSERVICES, searchParams?.toString()],
            queryFn: async () => {
                let res = await axios.get(`${process.env.NEXT_PUBLIC_URL}${Endpoints.TAGS}/${tagName}/services?${searchParams}`);
                return res.data;
            },
            staleTime: 0
        })
    }

    const fetchTagsOfServicesLastPage = (tagName: string) => {
        return useQuery({
            queryKey: [ReactQueryKeys.TAGSOFSERVICESLASTPAGE],
            queryFn: async () => {
                let res = await axios.get(`${process.env.NEXT_PUBLIC_URL}${Endpoints.TAGS}/${tagName}/services/lastPage`);
                return res.data;
            },
            staleTime: 0
        })
    }

    return [{ fetchTagsOfServices, fetchTagsOfServicesLastPage }]
}
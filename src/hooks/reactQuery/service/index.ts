"use client";
import { Endpoints } from '@/constants/common/endpoints';
import ReactQueryKeys from '@/constants/common/reactQueryKeys';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

export const useQueryervice = () => {
    const fetchService = (id: string) => {
        return useQuery({
            queryKey: [ReactQueryKeys.SERVICE],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICE}?serviceId=${id}`
                let res = await axios.get(reqUrl);
                return res.data;
            }
        })
    }

    const fetchSimilarServices = (id: string) => {
        return useQuery({
            queryKey: [ReactQueryKeys.SIMILARSERVICES],
            queryFn: async () => {
                let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SIMILARSERVICES}?serviceId=${id}`
                let res = await axios.get(reqUrl);
                return res.data;
            }
        })
    }

    return [{ fetchService, fetchSimilarServices }]
}
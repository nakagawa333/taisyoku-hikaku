"use client";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ReactQueryKeys from '@/constants/common/reactQueryKeys';
import { Endpoints } from '@/constants/common/endpoints';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const useServices = () => {
    const fetchServices = (searchParams:ReadonlyURLSearchParams | null) => {
        return useQuery({
            queryKey:[ReactQueryKeys.SERVICES],
            queryFn: async() => {
                let res = await axios.get(`${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICES}?${searchParams}`);
                return res.data;
            },
            staleTime:0
        })
    }

    const fetchServicesLastPage = () => {
        return useQuery({
            queryKey:[ReactQueryKeys.SERVICESLASTPAGE],
            queryFn: async() => {
                let res = await axios.get(`${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICESLASTPAGE}`);
                return res.data;
            },
            staleTime:0
        })
    }

    return [{fetchServices,fetchServicesLastPage}]
}
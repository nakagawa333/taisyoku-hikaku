"use client";
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import ReactQueryKeys from '@/constants/common/reactQueryKeys';
import { Endpoints } from '@/constants/common/endpoints';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const useServices = () => {
    const fetchServices = (searchParams:ReadonlyURLSearchParams | null) => {
        return useQuery({
            queryKey:[ReactQueryKeys.SERVICES],
            queryFn: async() => {
                let res;
                if(searchParams !== null){
                    res = await axios.get(`${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICES}?${searchParams}`);
                } else {
                    res = await axios.get(`${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICES}`);
                }
                return res.data;
            }
        })
    }

    return [{fetchServices}]
}
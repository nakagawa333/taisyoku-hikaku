"use client";
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import ReactQueryKeys from '@/constants/common/reactQueryKeys';
import { Endpoints } from '@/constants/common/endpoints';

export const useServices = () => {
    const fetchServices = () => {
        return useQuery({
            queryKey:[ReactQueryKeys.SERVICES],
            queryFn: async() => {
                let res = await axios.get(process.env.NEXT_PUBLIC_URL + Endpoints.SERVICES);
                return res.data;
            }
        })
    }   

    return [{fetchServices}]
}
"use client";
import axios from "axios";
import { useMutation, useQuery } from '@tanstack/react-query';
import ReactQueryKeys from '@/constants/reactQueryKeys';
import { Endpoints } from '@/constants/endpoints';

export const useService = () => {
    const fetchService = (id:string) => {
        return useQuery({
            queryKey:[ReactQueryKeys.SERVICE],
            queryFn: async() => {
                let res = await axios.get(`${process.env.NEXT_PUBLIC_URL} + ${Endpoints.SERVICE}?serviceId=${id}`);
                return res.data;
            }
        })
    }
    return [{fetchService}]
}
"use client";
import axios from "axios";
import { useMutation, useQuery } from '@tanstack/react-query';
import ReactQueryKeys from '@/constants/common/reactQueryKeys';
import { Endpoints } from '@/constants/common/endpoints';

export const useService = () => {
    const fetchService = (id:string) => {
        return useQuery({
            queryKey:[ReactQueryKeys.SERVICE],
            queryFn: async() => {
                let reqUrl:string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SERVICE}?serviceId=${id}`
                let res = await axios.get(reqUrl);
                return res.data;
            }
        })
    }
    return [{fetchService}]
}
import { Endpoints } from "@/constants/common/endpoints";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

export const useTags = () => {
    const fetchTags = () => {
        return useQuery({
            queryKey: [ReactQueryKeys.TAGS],
            queryFn: async () => {
                let res = await axios.get(`${process.env.NEXT_PUBLIC_URL}${Endpoints.TAGS}`);
                return res.data;
            },
            staleTime: 0
        })
    }
    return [{ fetchTags }]
}
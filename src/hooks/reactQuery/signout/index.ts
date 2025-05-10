import { Endpoints } from "@/constants/common/endpoints";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import axios from "axios";

/**
 * サインアウト ReactQuery
 */
export const useQuerySignout = () => {
    /**
     * サインアウトを行う
     */
    const useQueryExeSignout = () => {
        const mutationFn: MutationFunction<any, any> = async (data) => {
            let reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.SIGNOUT}`;
            const res = await axios.post(reqUrl);
            return res.data;
        };

        return useMutation({
            mutationFn: mutationFn
        })
    }

    return { useQueryExeSignout }
}
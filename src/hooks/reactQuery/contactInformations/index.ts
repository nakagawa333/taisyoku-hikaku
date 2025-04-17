import { Endpoints } from "@/constants/common/endpoints";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

export const useQueryContactInformations = () => {

    const submitContactInformations = () => {
        const mutationFn: MutationFunction<any, any> = async (data) => {
            const reqUrl: string = `${process.env.NEXT_PUBLIC_URL}${Endpoints.CONTACTINFORMATIONS}`;

            const config: AxiosRequestConfig = {
                headers: {
                    "X-Auth-Token": data.token
                }
            }

            const reqData = {
                mail: data.mail,
                inquiryDetails: data.inquiryDetails
            }

            const res = await axios.post(reqUrl, reqData, config);
            return res.data;
        }
        return useMutation({
            mutationFn: mutationFn
        })
    }

    return {
        submitContactInformations
    }
}
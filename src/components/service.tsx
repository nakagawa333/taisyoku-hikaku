"use client";

import { useService } from "@/hooks/reactQuery/service";
import Loading from "./loading";
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import Header from "./header";
import Footer from "./footer";


export default function Page(){
    const pathname = usePathname();
    let pathnameSplit = pathname?.split("/");

    let id:string = "";
    if(pathnameSplit){
        id = pathnameSplit[pathnameSplit?.length - 1]; 
    }

    const [{fetchService}] = useService();
    const {data,isLoading,isError} = fetchService(id);

    const fields:any = {
        "serviceName":"サービス名",
        "price":"料金",
        "managementName":"運営元",
        "contactInformationNames":"連絡先",
        "freeConsultation":"無料相談",
        "guaranteeSystem":"保障制度",
        "freeGift":"無料相談",
        "hourService":"24時間対応"
    }
    
    return(
        <>
            <Header />
            <div className="container">
                {
                    isLoading && !isError && (
                        <Loading 
                            isOpen={isLoading}
                        />
                    )
                }

                <div className="flex flex-wrap">
                    {
                        data?.service && (
                            <div className="m-auto">
                                <div className="m-auto">
                                    <img src={data.imgUrl}></img>
                                </div>
                                <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <tbody>
                                            {
                                                Object.keys(data.service).map((key:string) => {
                                                    return(
                                                        <tr>
                                                            <td className="border px-6 py-3 text-gray-800">
                                                                {fields[key]}
                                                            </td>

                                                            <td className="border px-6 py-3 text-gray-800">
                                                                {data.service[key]}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}
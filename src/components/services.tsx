"use client";
import { useServices } from "@/hooks/reactQuery/services";

import Loading from "./loading";
import Image from "next/image";
import { Service } from "@/types/service";
import { ReadonlyURLSearchParams, usePathname, useRouter,useSearchParams } from "next/navigation";
import { Paths } from "@/constants/common/paths";
import Pagination from "./pagination";
import { useQueryClient } from "@tanstack/react-query";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useEffect, useState } from "react";

export default function Services(){
    const searchParams:ReadonlyURLSearchParams | null = useSearchParams();
    const pathname:string | null = usePathname();
    const router = useRouter();

    //パス
    const path:string = pathname !== null ? pathname : "";


    const queryClient = useQueryClient();
    
    const [page,setPage] = useState("");
    const [params,setParams] = useState("?");
    const [currentPage,setCurrentPage] = useState(1);

    useEffect(() => {
        let params:string = "?";
        if(searchParams !== null){
            for(const [key, value] of searchParams){
                if(key === "p" && value !== page){
                    if(value !== page) {
                        setPage(value);
                        setCurrentPage(Number(value));
                    }
                } else {
                    params += `${key}=${value}&`;
                    setParams(params);
                }
            }
        }

    },[searchParams])

    useEffect(() => {
        queryClient.invalidateQueries({queryKey:[ReactQueryKeys.SERVICES]});
    },[page])

    const [{fetchServices}] = useServices();
    const {data,isLoading,isError,isFetchedAfterMount} = fetchServices(searchParams);


    /**
     * 詳細ボタンクリック
     */
    const detailButtonClick = (serviceId:string) => {
        if(serviceId){
            //ページ遷移
            router.push(`${Paths.SERVICE}/${serviceId}`);
        }
    }


    if(isLoading || !isFetchedAfterMount){
        return <Loading 
        isOpen={isLoading}
        />
    }

    if(isError){
        return <div>エラー</div>
    }

    return(
        <>
            <div className="container m-auto">
                <div className="mt-5">
                    {
                        isFetchedAfterMount && Array.isArray(data?.services) ? (
                            <Pagination 
                                currentPage={currentPage}
                                totalPage={5}
                                path={path}
                                params={params}
                            />
                        ) : (
                            <></>
                        )
                    }

                </div>
                <div className="flex flex-wrap rounded-t-lg overflow-hidden p-10 justify-around">
                    {
                        isFetchedAfterMount && Array.isArray(data?.services) && data.services.map((service:Service,index:number) => {
                            return (
                                    <div 
                                    className="rounded overflow-hidden shadow-lg max-w-xs mb-20" 
                                    key={index}
                                    >
                                            {
                                                service.imgUrl && (
                                                    <img
                                                        className="w-full"
                                                        src={service.imgUrl}
                                                        alt="image"
                                                    />
                                                )
                                            }
                                        <div className="px-6 py-4">
                                                <div className="font-bold text-xl mb-2">
                                                    {service.serviceName}
                                                </div>
                                                <p className="text-gray-700 text-base">

                                                </p>
                                        </div>


                                        <div className="px-6">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                #photography
                                            </span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                #travel
                                            </span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                #winter
                                            </span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                #winter
                                            </span>                     
                                        </div>

                                        <div className="flex">
                                            <div className="ml-auto">
                                                <a 
                                                className="mb-3 mr-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                onClick={() => detailButtonClick(service.serviceId)}  
                                                >
                                                    詳細
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                            )
                        })
                    }
                </div>

                <div className="mb-5">
                    {
                        isFetchedAfterMount && Array.isArray(data?.services) ? (
                            <Pagination 
                                currentPage={currentPage}
                                totalPage={5}
                                path={path}
                                params={params}
                            />
                        ) : (
                            <></>
                        )
                    }
                </div>

            </div>
        </>
    )
}
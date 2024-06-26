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
import PartialLoading from "./partialLoading";
import ErrorSnackbar from "./ErrorSnackbar";
import DetailButton from "./DetailButton";

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

    const [{fetchServices,fetchServicesLastPage}] = useServices();

    const resServices = fetchServices(searchParams);
    const servicesData:any = resServices.data;
    const servicesIsLoading:boolean = resServices.isLoading;
    const servicesIsError:boolean = resServices.isError;
    const servicesIsFetchedAfterMount:boolean = resServices.isFetchedAfterMount;

    const resServicesLastPage = fetchServicesLastPage(searchParams);
    const servicesLastPageData:any = resServicesLastPage.data;
    const servicesLastPageIsLoading:boolean = resServicesLastPage.isLoading;
    const servicesLastPageIsError:boolean = resServicesLastPage.isError;
    const servicesLastPageIsFetchedAfterMount:boolean = resServicesLastPage.isFetchedAfterMount;

    /**
     * 詳細ボタンクリック
     */
    const detailButtonClick = (serviceId:string) => {
        if(serviceId){
            //ページ遷移
            router.push(`${Paths.SERVICE}/${serviceId}`);
        }
    }

    if(servicesIsLoading || !servicesIsFetchedAfterMount || servicesLastPageIsLoading){
        return <PartialLoading isOpen={true} />
    }

    if(servicesIsError || servicesLastPageIsError){
        return <ErrorSnackbar
                    message="エラーが発生しました"
                    time={5000}
               />
    }

    return(
        <>  
            <div className="container m-auto">
                <div className="flex flex-wrap rounded-t-lg overflow-hidden p-10 justify-around">
                    {servicesLastPageData.length}件の検索結果
                </div>
                <div className="flex flex-wrap rounded-t-lg overflow-hidden p-10 justify-around">
                    {
                        servicesIsFetchedAfterMount && Array.isArray(servicesData?.services) && 0 < servicesData.services.length && servicesData.services.map((service:Service,index:number) => {
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
                                            {
                                                Array.from(service.tags) && service.tags.map((tag:any) => {
                                                    return (
                                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                            #{tag.tagName}
                                                        </span>                                                    
                                                    )
                                                })
                                            }
                                        </div>


                                        <DetailButton
                                            serviceId={service.serviceId}
                                        />    
                                    </div>
                            )
                        })
                    }

                    {
                        servicesIsFetchedAfterMount && Array.isArray(servicesData?.services) && 0 === servicesData.services.length && (
                            <h1>条件を変更してもう一度検索してください</h1>
                        )                    
                    }
                </div>

                <div className="mb-5">
                    {
                        servicesIsFetchedAfterMount && Array.isArray(servicesData?.services) && 0 < servicesData.services.length ? (
                            <Pagination 
                                currentPage={currentPage}
                                lastPage={servicesLastPageData.lastPage}
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
"use client";
import { useServices } from "@/hooks/reactQuery/services";

import Loading from "./loading";
import Image from "next/image";
import { Service } from "@/types/service";
import { useRouter } from "next/navigation";

export default function Services(){
    const router = useRouter();
    const [{fetchServices}] = useServices();
    const {data,isLoading,isError} = fetchServices();

    /**
     * 詳細ボタンクリック
     */
    const detailButtonClick = (serviceId:string) => {
        if(serviceId){
            //ページ遷移
            router.push(`/service/${serviceId}`);
        }
    }

    return(
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
                    Array.isArray(data?.services) && data.services.map((service:Service,index:number) => {
                        return (
                            <div className="" key={index}>
                                <div className="items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <div className="">
                                        {
                                            service.imgUrl && (
                                                <img 
                                                    src={service.imgUrl}
                                                    alt="image"
                                                />       
                                            )
                                        }
                                    </div>
                                    <div className="">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {service.serviceName}
                                        </h5>
                                        <a 
                                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                          onClick={() => detailButtonClick(service.serviceId)}  
                                        >
                                            詳細
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
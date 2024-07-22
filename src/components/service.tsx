"use client";

import { ServiceResponse } from "@/constants/api/response/serviceResponse";
import { useService } from "@/hooks/reactQuery/service";
import { Breadcrumb } from "@/types/ui/breadcrumb";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import ErrorSnackbar from "./ErrorSnackbar";
import OfficialWebsiteButton from "./OfficialWebsiteButton";
import Breadcrumbs from "./breadcrumbs";
import PartialLoading from "./partialLoading";
import PromotionMessage from "./promotionMessage";
import SimilarServicesSwiper from "./swiper";


export default function Page() {
    const pathname = usePathname();
    let pathnameSplit = pathname?.split("/");

    let id: string = "";
    if (pathnameSplit) {
        id = pathnameSplit[pathnameSplit?.length - 1];
    }

    const [{ fetchService, fetchSimilarServices }] = useService();
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    const resService = fetchService(id);
    const serviceData: any = resService.data;
    const service: ServiceResponse | null = serviceData?.service;
    const serviceIsLoading: boolean = resService.isLoading;
    const servicesIsError: boolean = resService.isError;
    const servicesIsFetchedAfterMount: boolean = resService.isFetchedAfterMount;

    const resSimilarServices = fetchSimilarServices(id);
    const similarServicesData: any = resSimilarServices.data;
    const similarServicesIsLoading: boolean = resSimilarServices.isLoading;
    const similarServicesIsError: boolean = resSimilarServices.isError;
    const similarServicesIsFetchedAfterMount: boolean = resSimilarServices.isFetchedAfterMount;

    const fields: any = {
        "serviceName": "サービス名",
        "price": "料金",
        "managementName": "運営元",
        "contactInformationNames": "連絡先",
        "freeConsultation": "無料相談",
        "guaranteeSystem": "送金保証",
        "freeGift": "無料プレゼント",
        "hourService": "24時間受付"
    }

    if (serviceIsLoading || similarServicesIsLoading || !servicesIsFetchedAfterMount || !similarServicesIsFetchedAfterMount) {
        return (
            <div className="min-h-screen">
                <PartialLoading isOpen={true} />
            </div>
        )
    }

    if (servicesIsError || similarServicesIsError) {
        return (
            <div className="container m-auto min-h-screen">
                <ErrorSnackbar
                    message="エラーが発生しました"
                    time={5000}
                />
            </div>
        )
    }

    if (servicesIsFetchedAfterMount && serviceData?.service) {
        const isExistBreadcrumbsId = breadcrumbs.some((breadcrumb: Breadcrumb) => breadcrumb.path === `/${id}`);
        if (!isExistBreadcrumbsId) {
            const breadcrumbs: Breadcrumb[] = [
                { path: "/", breadcrumb: "ホーム" },
                { path: "/services", breadcrumb: "サービス" }
            ]

            breadcrumbs.push({
                path: `/${id}`,
                breadcrumb: serviceData.service.serviceName
            })
            setBreadcrumbs(breadcrumbs);
        }
    }

    return (
        <div className="container">
            <div className="p-4">
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                />
            </div>

            <PromotionMessage />

            <div className="p-4">
                <h1 className="text-2xl font-bold mt-0 mb-4">
                    {
                        service && (
                            <h1 className="text-2xl font-bold mt-0 mb-4 border-b-2 mt-6">{service.serviceName}</h1>
                        )
                    }
                </h1>
            </div>

            <div className="">
                {
                    service && (
                        <div className="">
                            <div className="flex items-center justify-center">
                                <img
                                    src={service.imgUrl}
                                    className="hover:scale-105 w-11/12"
                                    style={{
                                        maxHeight: "180px"
                                    }}
                                >
                                </img>
                            </div>

                            <div className="flex items-center justify-center">
                                <table className="table-auto w-11/12 mt-8">
                                    <tbody>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">料金</td>
                                            <td className="border px-4 py-2 w-3/4">{service.price}円</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">運営元</td>
                                            <td className="border px-4 py-2 w-3/4">{service.managementName}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">連絡先</td>
                                            <td className="border px-4 py-2 w-3/4">{service.contactInformationNames}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">無料相談</td>
                                            <td className="border px-4 py-2 w-3/4">{service.freeConsultation}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">送金保証</td>
                                            <td className="border px-4 py-2 w-3/4">{service.guaranteeSystem}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">無料プレゼント</td>
                                            <td className="border px-4 py-2 w-3/4">{service.freeGift}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">24時間受付</td>
                                            <td className="border px-4 py-2 w-3/4">{service.hourService}</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>


                            <div className="">
                                <OfficialWebsiteButton
                                    url={service.officialWebsite}
                                />
                            </div>
                        </div>

                    )
                }

            </div>

            {/* <div className="flex flex-wrap">
                    {
                        servicesIsFetchedAfterMount && serviceData?.service && (
                            <div className="m-auto">
                                <div className="m-auto">
                                    <img src={serviceData.imgUrl}></img>
                                </div>
                                <table className="table-auto w-full text-gray-500 dark:text-gray-400">
                                    <tbody>
                                        {
                                            Object.keys(serviceData.service).map((key: string, index: number) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border px-6 py-3 text-gray-800">
                                                            {fields[key]}
                                                        </td>

                                                        <td className="border px-6 py-3 text-gray-800">
                                                            {serviceData.service[key]}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                                <div className="">
                                    <OfficialWebsiteButton
                                        url={serviceData.officialWebsite}
                                    />
                                </div>
                            </div>
                        )
                    }
                </div> */}


            <div className="container">
                <p
                    className="text-gray-600 w-full [border:none] [outline:none] bg-gray-ededed self-stretch h-[47px] overflow-hidden shrink-0 flex flex-row items-start justify-start py-2.5 px-6 box-border font-yugothic font-bold text-lg text-gyar-6a6a6a min-w-[216px]"
                    style={{
                        background: "#EDEDED"
                    }}
                >
                    似た条件のサービス
                </p>
            </div>

            <div
                className="container"
            >
                {
                    similarServicesIsFetchedAfterMount && Array.isArray(similarServicesData?.similarServices) && (
                        <SimilarServicesSwiper
                            similarServices={similarServicesData.similarServices}
                        />
                    )
                }
            </div>
        </div>
    )
}
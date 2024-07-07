"use client";

import { useService } from "@/hooks/reactQuery/service";
import { usePathname } from 'next/navigation';
import ErrorSnackbar from "./ErrorSnackbar";
import OfficialWebsiteButton from "./OfficialWebsiteButton";
import PartialLoading from "./partialLoading";
import SimilarServicesSwiper from "./swiper";


export default function Page() {
    const pathname = usePathname();
    let pathnameSplit = pathname?.split("/");

    let id: string = "";
    if (pathnameSplit) {
        id = pathnameSplit[pathnameSplit?.length - 1];
    }

    const [{ fetchService, fetchSimilarServices }] = useService();

    const resService = fetchService(id);
    const serviceData: any = resService.data;
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
        "guaranteeSystem": "保障制度",
        "freeGift": "無料プレゼント",
        "hourService": "24時間対応"
    }

    if (serviceIsLoading || similarServicesIsLoading) {
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

    return (
        <>
            <div className="container">
                <div className="flex flex-wrap">
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
                </div>


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

                <div style={{ width: "90%", margin: "auto" }}>
                    {
                        similarServicesIsFetchedAfterMount && Array.isArray(similarServicesData?.similarServices) && (
                            <SimilarServicesSwiper
                                similarServices={similarServicesData.similarServices}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}
"use client";
import { useServices } from "@/hooks/reactQuery/services";

import { Paths } from "@/constants/common/paths";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { Service } from "@/types/service";
import { Breadcrumb } from "@/types/ui/breadcrumb";
import { useQueryClient } from "@tanstack/react-query";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "./Card";
import ErrorSnackbar from "./ErrorSnackbar";
import Breadcrumbs from "./breadcrumbs";
import Pagination from "./pagination";
import PartialLoading from "./partialLoading";

export default function Services() {
    const searchParams: ReadonlyURLSearchParams | null = useSearchParams();
    const pathname: string | null = usePathname();
    const router = useRouter();

    //パス
    const path: string = pathname !== null ? pathname : "";


    const queryClient = useQueryClient();

    const [page, setPage] = useState("");
    const [params, setParams] = useState("?");
    const [currentPage, setCurrentPage] = useState(1);

    const breadcrumbs: Breadcrumb[] = [
        {
            path: "/",
            breadcrumb: "ホーム"
        },
        {
            path: "/services",
            breadcrumb: "サービス"
        },
    ]

    useEffect(() => {
        let params: string = "?";
        if (searchParams !== null) {
            for (const [key, value] of searchParams) {
                if (key === "p" && value !== page) {
                    if (value !== page) {
                        setPage(value);
                        setCurrentPage(Number(value));
                    }
                } else {
                    params += `${key}=${value}&`;
                    setParams(params);
                }
            }
        }

    }, [searchParams])

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICES] });
    }, [page])

    const [{ fetchServices, fetchServicesLastPage }] = useServices();

    const resServices = fetchServices(searchParams);
    const servicesData: any = resServices.data;
    const servicesIsLoading: boolean = resServices.isLoading;
    const servicesIsError: boolean = resServices.isError;
    const servicesIsFetchedAfterMount: boolean = resServices.isFetchedAfterMount;

    const resServicesLastPage = fetchServicesLastPage(searchParams);
    const servicesLastPageData: any = resServicesLastPage.data;
    const servicesLastPageIsLoading: boolean = resServicesLastPage.isLoading;
    const servicesLastPageIsError: boolean = resServicesLastPage.isError;
    const servicesLastPageIsFetchedAfterMount: boolean = resServicesLastPage.isFetchedAfterMount;

    /**
     * 詳細ボタンクリック
     */
    const detailButtonClick = (serviceId: string) => {
        if (serviceId) {
            //ページ遷移
            router.push(`${Paths.SERVICE}/${serviceId}`);
        }
    }

    if (servicesIsLoading || !servicesIsFetchedAfterMount || servicesLastPageIsLoading) {
        return (
            <div className="min-h-screen">
                <PartialLoading isOpen={true} />
            </div>
        )
    }

    if (servicesIsError || servicesLastPageIsError) {
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
            <div className="container m-auto min-h-screen">
                <div className="p-4">
                    <Breadcrumbs
                        breadcrumbs={breadcrumbs}
                    />
                </div>
                <div className="flex flex-wrap rounded-t-lg overflow-hidden p-10 justify-around">
                    {servicesLastPageData.length}件の検索結果
                </div>
                <div className="flex flex-wrap rounded-t-lg overflow-hidden p-10 justify-around">
                    {
                        servicesIsFetchedAfterMount && Array.isArray(servicesData?.services) && 0 < servicesData.services.length && servicesData.services.map((service: Service, index: number) => {
                            return (

                                <Card
                                    imgUrl={service?.imgUrl}
                                    serviceId={service.serviceId}
                                    serviceName={service.serviceName}
                                    tags={service.tags}
                                />
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
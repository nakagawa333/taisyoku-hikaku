"use client";

import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useTagsOfServices } from "@/hooks/reactQuery/tags/tagName/services";
import { useQueryClient } from "@tanstack/react-query";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Card from "../../Card";
import ErrorSnackbar from "../../ErrorSnackbar";
import Pagination from "../../pagination";
import PartialLoading from "../../partialLoading";

export const TagsOfServices = () => {
    const searchParams: ReadonlyURLSearchParams | null = useSearchParams();
    const pathname: string | null = usePathname();
    let tagName: string = "";
    if (pathname !== null) {
        const splitPathName: string[] = pathname.split("/");
        tagName = decodeURIComponent(splitPathName[splitPathName.length - 1]);
    }

    //パス
    const path: string = pathname !== null ? decodeURIComponent(pathname) : "";
    const router = useRouter();

    const [page, setPage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState("?");

    const queryClient = useQueryClient();
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICES] });
    }, [page]);

    const [{ fetchTagsOfServices, fetchTagsOfServicesLastPage }] = useTagsOfServices();
    const resTagsOfServices = fetchTagsOfServices(tagName, searchParams);
    const tagsOfServicesData: any = resTagsOfServices.data;
    const tagsOfServicesIsLoading: boolean = resTagsOfServices.isLoading;
    const tagsOfServicesIsError: boolean = resTagsOfServices.isError;
    const tagsOfServicesIsFetchedAfterMount: boolean = resTagsOfServices.isFetchedAfterMount;

    const resTagsOfServicesLastPage = fetchTagsOfServicesLastPage(tagName);
    const tagsTagsOfServicesLastPageData: any = resTagsOfServicesLastPage.data;
    const tagsTagsOfServicesLastPageLoading: boolean = resTagsOfServicesLastPage.isLoading;
    const tagsTagsOfServicesLastPageIsError: boolean = resTagsOfServicesLastPage.isError;
    const tagsTagsOfServicesLastPageIsFetchedAfterMount: boolean = resTagsOfServicesLastPage.isFetchedAfterMount;

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
    if (tagsOfServicesIsLoading) {
        return (
            <div className="min-h-screen">
                <PartialLoading isOpen={true} />
            </div>
        )
    }

    if (tagsOfServicesIsError || tagsTagsOfServicesLastPageIsError) {
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
                <div className="flex flex-wrap rounded-t-lg overflow-hidden p-10 justify-around">
                    {tagsTagsOfServicesLastPageData.tagsCount}件の検索結果
                </div>
                <div className="flex flex-wrap rounded-t-lg overflow-hidden p-10 justify-around">
                    {
                        tagsOfServicesIsFetchedAfterMount && Array.isArray(tagsOfServicesData?.tagsOfServices) && 0 < tagsOfServicesData.tagsOfServices.length && tagsOfServicesData.tagsOfServices.map((service: any, index: number) => {
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
                        tagsOfServicesIsFetchedAfterMount && Array.isArray(tagsOfServicesData?.tagsOfServices) && 0 === tagsOfServicesData.tagsOfServices.length && (
                            <h1>条件を変更してもう一度検索してください</h1>
                        )
                    }
                </div>

                <div className="mb-5">
                    {
                        tagsOfServicesIsFetchedAfterMount && Array.isArray(tagsOfServicesData?.tagsOfServices) && 0 < tagsOfServicesData.tagsOfServices.length ? (
                            <Pagination
                                currentPage={currentPage}
                                lastPage={tagsTagsOfServicesLastPageData.lastPage}
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
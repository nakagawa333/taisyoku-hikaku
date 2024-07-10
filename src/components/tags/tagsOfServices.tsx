"use client";

import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useTagsOfServices } from "@/hooks/reactQuery/tags/tagName/services";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../Card";
import ErrorSnackbar from "../ErrorSnackbar";
import PartialLoading from "../partialLoading";

export const TagsOfServices = () => {
    const pathname: string | null = usePathname();
    let tagName: string = "";
    if (pathname !== null) {
        const splitPathName: string[] = pathname.split("/");
        tagName = decodeURIComponent(splitPathName[splitPathName.length - 1]);
    }
    const router = useRouter();

    const [page, setPage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const queryClient = useQueryClient();
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICES] });
    }, [page]);

    const [{ fetchTagsOfServices }] = useTagsOfServices();
    const resTagsOfServices = fetchTagsOfServices(tagName);
    const tagsOfServicesData: any = resTagsOfServices.data;
    const tagsOfServicesIsLoading: boolean = resTagsOfServices.isLoading;
    const tagsOfServicesIsError: boolean = resTagsOfServices.isError;
    const tagsOfServicesIsFetchedAfterMount: boolean = resTagsOfServices.isFetchedAfterMount;

    if (tagsOfServicesIsLoading) {
        return (
            <div className="min-h-screen">
                <PartialLoading isOpen={true} />
            </div>
        )
    }

    if (tagsOfServicesIsError) {
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
                    {0}件の検索結果
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

                {/* <div className="mb-5">
                    {
                        servicesIsFetchedAfterMount && Array.isArray(tagsOfServicesData?.services) && 0 < tagsOfServicesData.services.length ? (
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
                </div> */}

            </div>
        </>
    )
}
"use client";


import Breadcrumbs from "@/components/breadcrumbs";
import ErrorSnackbar from "@/components/ErrorSnackbar";
import Pagination from "@/components/pagination";
import PartialLoading from "@/components/partialLoading";
import TermsLists from "@/features/ranking/components/termsLists";
import { useTagsOfServices } from "../hooks/useTagsOfServices";
import TagsOfServicesCard from "./tagsOfServicesCard";

export const TagsOfServices = () => {

    const {
        tagsOfServicesIsLoading, tagsTagsOfServicesLastPageLoading,
        tagsOfServicesIsError, tagsTagsOfServicesLastPageIsError,
        breadcrumbs, tagName,
        tagsTagsOfServicesLastPageData, tagsOfServicesIsFetchedAfterMount,
        tagsOfServicesData,
        tagsTagsOfServicesLastPageIsFetchedAfterMount,
        currentPage,
        path, params
    } = useTagsOfServices();

    if (tagsOfServicesIsLoading || tagsTagsOfServicesLastPageLoading || !tagsOfServicesIsFetchedAfterMount || !tagsTagsOfServicesLastPageIsFetchedAfterMount) {
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
                <div className="p-4">
                    <Breadcrumbs
                        breadcrumbs={breadcrumbs}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                        <div className="pt-1">
                            <h1 className="text-2xl font-bold mt-0 mb-4">{tagName}</h1>
                        </div>
                        <div className="flex flex-wrap rounded-t-lg overflow-hidden pb-2 justify-around">
                            {tagsTagsOfServicesLastPageData.tagsCount}件の検索結果
                        </div>
                        {
                            tagsOfServicesIsFetchedAfterMount && Array.isArray(tagsOfServicesData?.services) && tagsOfServicesData.services.map((service: any, index: number) => {
                                return (
                                    <TagsOfServicesCard
                                        key={service.serviceId}
                                        service={service}
                                        rank={service.rank}
                                    />
                                )
                            })
                        }

                        {
                            tagsOfServicesIsFetchedAfterMount && Array.isArray(tagsOfServicesData?.services) && 0 === tagsOfServicesData.services.length && (
                                <h1>条件を変更してもう一度検索してください</h1>
                            )
                        }

                        <div className="mb-5">
                            {
                                tagsOfServicesIsFetchedAfterMount && Array.isArray(tagsOfServicesData?.services) && 0 < tagsOfServicesData.services.length ? (
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


                    <div className="">
                        <TermsLists
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQueryTagsOfServices } from "@/hooks/reactQuery/tags/tagName/services";
import { Breadcrumb } from "@/types/ui/breadcrumb";
import { useQueryClient } from "@tanstack/react-query";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useTagsOfServices = () => {
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

    const breadcrumbs: Breadcrumb[] = [
        {
            path: "/",
            breadcrumb: "ホーム"
        },
        {
            path: "/tags",
            breadcrumb: "タグ"
        },
        {
            path: `/tags/${tagName}`,
            breadcrumb: tagName
        }
    ]

    const queryClient = useQueryClient();
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICES] });
    }, [page]);

    const [{ fetchTagsOfServices, fetchTagsOfServicesLastPage }] = useQueryTagsOfServices();
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

    return {
        tagsOfServicesIsLoading, tagsTagsOfServicesLastPageLoading,
        tagsOfServicesIsError, tagsTagsOfServicesLastPageIsError,
        breadcrumbs, tagName,
        tagsTagsOfServicesLastPageData, tagsOfServicesIsFetchedAfterMount,
        tagsOfServicesData,
        tagsTagsOfServicesLastPageIsFetchedAfterMount,
        currentPage,
        path, params
    }
}
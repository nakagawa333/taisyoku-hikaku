import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { Take } from "@/constants/db/take";
import { useRankingServices } from "@/hooks/reactQuery/rankingServices";
import { useQueryClient } from "@tanstack/react-query";
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useRankingservices() {
    const searchParams: ReadonlyURLSearchParams | null = useSearchParams();
    const pathname = usePathname();
    let pathnameSplit = pathname?.split("/");
    //パス
    const path: string = pathname !== null ? pathname : "";

    const [page, setPage] = useState("1");
    const [params, setParams] = useState("?");
    const [currentPage, setCurrentPage] = useState(1);

    const { fetchRankingServices, fetchRankingServicesMetadata } = useRankingServices();
    const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.RANKINGSERVICES] });
    }, [page])

    const { data: rankingServicesData, isLoading: rankingServicesIsloading,
        isError: rankingServicesIsError, isFetchedAfterMount: rankingServicesIsFetchedAfterMount } = fetchRankingServices(Take.RANKING_SERVICES, page);

    const { data: rankingServicesMetaDataData, isLoading: rankingServicesMetaDataIsLoading,
        isError: rankingServicesMetaDataIsError, isFetchedAfterMount: rankingServicesMetaDataIsFetchedAfterMount } = fetchRankingServicesMetadata();

    return {
        rankingServicesData, rankingServicesIsloading, rankingServicesIsError, rankingServicesIsFetchedAfterMount,
        rankingServicesMetaDataData, rankingServicesMetaDataIsLoading, rankingServicesMetaDataIsError, rankingServicesMetaDataIsFetchedAfterMount,
        currentPage, path, params
    }
}
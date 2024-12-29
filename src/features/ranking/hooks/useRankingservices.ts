import { useRankingServices } from "@/hooks/reactQuery/rankingServices";
import { useState } from "react";

export default function useRankingservices() {
    const [services, setServices] = useState([]);

    const { fetchRankingServices } = useRankingServices();

    const { data, isLoading, isError, isFetchedAfterMount } = fetchRankingServices();
    return {
        services,
        data, isLoading, isError, isFetchedAfterMount
    }
}
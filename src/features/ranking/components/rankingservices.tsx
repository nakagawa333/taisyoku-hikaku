import ErrorSnackbar from "@/components/ErrorSnackbar";
import PartialLoading from "@/components/partialLoading";
import useRankingservices from "../hooks/useRankingservices";
import Card from "./card";

export default function Rankingservices() {

    const { services,
        data, isLoading, isError, isFetchedAfterMount } = useRankingservices();

    if (isLoading || !isFetchedAfterMount) {
        return (
            <div className="min-h-screen">
                <PartialLoading isOpen={true} />
            </div>
        )
    }

    if (isError) {
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
            {
                Array.isArray(data.services) && data.services.map((service: any, index: number) => {
                    return (
                        <Card
                            key={service.serviceId}
                            service={service}
                            rank={index + 1}
                        />
                    )
                })
            }

        </>
    )
}
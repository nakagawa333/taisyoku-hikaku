import ErrorSnackbar from "@/components/ErrorSnackbar";
import Pagination from "@/components/pagination";
import PartialLoading from "@/components/partialLoading";
import useRankingservices from "../hooks/useRankingservices";
import Card from "./card";

export default function Rankingservices() {

    const {
        rankingServicesData, rankingServicesIsloading, rankingServicesIsError, rankingServicesIsFetchedAfterMount,
        rankingServicesMetaDataData, rankingServicesMetaDataIsLoading, rankingServicesMetaDataIsError, rankingServicesMetaDataIsFetchedAfterMount,
        currentPage, path, params
    } = useRankingservices();

    if (rankingServicesIsloading || !rankingServicesIsFetchedAfterMount
        || rankingServicesMetaDataIsLoading || !rankingServicesMetaDataIsFetchedAfterMount) {
        return (
            <div className="min-h-screen">
                <PartialLoading isOpen={true} />
            </div>
        )
    }

    if (rankingServicesIsError || rankingServicesMetaDataIsError) {
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
                Array.isArray(rankingServicesData.services) && rankingServicesData.services.map((service: any, index: number) => {
                    return (
                        <Card
                            key={service.serviceId}
                            service={service}
                            rank={service.rank}
                        />
                    )
                })
            }

            {

                rankingServicesMetaDataData.lastPage ? (
                    <div className="mb-4">
                        <Pagination
                            currentPage={currentPage}
                            lastPage={rankingServicesMetaDataData.lastPage}
                            path={path}
                            params={params}
                        />
                    </div>

                ) : (null)
            }
        </>
    )
}
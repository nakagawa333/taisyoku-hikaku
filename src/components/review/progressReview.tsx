import { useQueryReviews } from "@/hooks/reactQuery/comments";
import { PercentageByRating } from "@/types/api/response/reviewsResponse";
import { useState } from "react";
import PartialLoading from "../partialLoading";
import Snackbar from "../snackbar";
import RatingProgress from "./ratingProgress";


type Props = {
    serviceId: string
}
export default function ProgressRevbiew(props: Props) {
    const { serviceId } = props;
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [{ fetchPercentageByRatings }] = useQueryReviews();

    const { data, isLoading, isError, isFetchedAfterMount } = fetchPercentageByRatings(serviceId);

    if (isLoading || !isFetchedAfterMount) {
        return (
            <div className="min-h-screen">
                <PartialLoading isOpen={true} />
            </div>
        )
    }

    if (isError) {
        return (
            <Snackbar
                state={"error"}
                message={"エラーが発生しました。再度画面ロードをお願いします"}
                time={5000}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        )
    }

    return (
        <div>
            {
                Array.isArray(data) && data.map((percentageByRating: PercentageByRating, index: number) => {
                    return (
                        <RatingProgress
                            key={index}
                            percentageByRating={percentageByRating}
                        />
                    )
                })
            }
        </div>
    )
}
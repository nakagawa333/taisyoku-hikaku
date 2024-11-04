import Pagination from "@/components/pagination";
import PartialLoading from "@/components/partialLoading";
import Snackbar from "@/components/snackbar";
import { ServiceReview } from "@/constants/api/response/serviceResponse";
import { Take } from "@/constants/db/take";
import { useQueryReviews } from "@/hooks/reactQuery/comments";
import { useState } from "react";
import Review from "./review";

type Props = {
    id: string
    page: string
    reviewsMetaDataIsAfterMount: boolean
    reviewsMetaDataData: any
    path: string
    currentPage: number
    params: string
}

export default function Reviews(props: Props) {
    const { id, page, reviewsMetaDataIsAfterMount, reviewsMetaDataData,
        currentPage, path, params
    } = props;
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [{ fetchReviews }] = useQueryReviews();
    const { data, isLoading, isError, isFetchedAfterMount } = fetchReviews(id, Take.REVIEWS, page);


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
                isFetchedAfterMount && Array.isArray(data?.reviews) && (
                    <div className="px-5">
                        {
                            data.reviews.map((review: ServiceReview) =>
                                <Review
                                    review={review}
                                    key={review.reviewId}
                                />
                            )
                        }
                    </div>
                )
            }

            {
                !Array.isArray(data?.reviews) || data.reviews.length === 0 && (
                    <div className="px-5">
                        <p className="text-lg mb-4 border-b-2">
                            まだコメントは投稿されていません
                        </p>
                    </div>
                )
            }

            <div className="mb-5">
                {
                    reviewsMetaDataIsAfterMount
                        && reviewsMetaDataData?.lastPage
                        && reviewsMetaDataData?.totalCount ? (
                        <Pagination
                            currentPage={currentPage}
                            lastPage={reviewsMetaDataData.lastPage}
                            path={path}
                            params={params}
                        />
                    ) : (
                        <></>
                    )
                }
            </div>
        </div>
    )
}
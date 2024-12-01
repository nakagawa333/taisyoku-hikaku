import { PostReviewType } from "@/types/ui/service/postPreview";
import { useContext } from "react";
import { PostReviewContext } from "./postReview";
import SatisfactionsReview from "./satisfactionsReview";

export default function Satisfactions() {

    const postReviewType: PostReviewType | null = useContext(PostReviewContext);

    if (!postReviewType) {
        return <></>
    }

    return (
        <div className="bg-gray-50 mx-auto max-w-sm shadow-md rounded-lg overflow-hidden">

            <div className="w-11/12 mx-auto mb-2">
                <SatisfactionsReview
                    label="価格の満足度"
                    field="priceSatisfaction"
                    satisfaction={postReviewType.reviewForm.priceSatisfaction}
                />

                <SatisfactionsReview
                    label="スピードの満足度"
                    field="speedSatisfaction"
                    satisfaction={postReviewType.reviewForm.speedSatisfaction}
                />

                <SatisfactionsReview
                    label="対応の満足度"
                    field="responseSatisfaction"
                    satisfaction={postReviewType.reviewForm.responseSatisfaction}
                />

                <SatisfactionsReview
                    label="コスパの満足度"
                    field="costPerformanceSatisfaction"
                    satisfaction={postReviewType.reviewForm.costPerformanceSatisfaction}
                />
            </div>
        </div>
    )
} 
import { PostReviewType } from "@/types/ui/service/postPreview"
import { ReviewFormState } from "@/types/ui/service/reviewFormState"
import { useContext } from "react"
import StarRatings from "react-star-ratings"
import { PostReviewContext } from "./postReview"

type Props = {
    label: string
    field: keyof ReviewFormState
    satisfaction: number
}

export default function SatisfactionsReview(props: Props) {
    const { label, field, satisfaction } = props;

    const postReviewType: PostReviewType | null = useContext(PostReviewContext);

    const onSatisfaction = (satisfaction: number) => {
        postReviewType?.updateFormField(field, satisfaction);
    }

    return (
        <div className="mt-3">
            <p className="text-xs font-bold">{label}</p>

            <div className="grid grid-cols-[auto,1fr] items-center gap-2 rtl:space-x-reverse">
                <StarRatings
                    rating={satisfaction}
                    changeRating={onSatisfaction}
                    numberOfStars={5}
                    name='rating'
                    starRatedColor="yellow"
                    starHoverColor="yellow"
                    ignoreInlineStyles={false}
                    starDimension="18px"
                    starSpacing="0px"
                />

                <p className="text-sm pt-1">{satisfaction}</p>
            </div>
        </div>
    )
}
import { Dispatch } from "react"
import StarRatings from "react-star-ratings"

type Props = {
    label: string
    satisfaction: number
    setSatisfaction: Dispatch<number>
}

export default function SatisfactionsReview(props: Props) {
    const { label, satisfaction, setSatisfaction } = props;
    const onSatisfaction = (satisfaction: number) => {
        setSatisfaction(satisfaction);
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
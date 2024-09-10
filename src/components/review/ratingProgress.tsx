import { PercentageByRating } from "@/types/api/response/reviewsResponse";

type Props = {
    percentageByRating: PercentageByRating
}

export default function RatingProgress(props: Props) {
    const { percentageByRating } = props;
    return (
        <div className="flex w-full">
            <p
                className="text-right w-1/6 pr-2"
                style={{
                    width: "7%"
                }}
            >

                {percentageByRating.rating}</p>
            <div
                className="bg-gray-200 h-6 mb-6 w-5/6"
            >
                <div
                    className="h-full"
                    style={{
                        width: `${percentageByRating.percentage}%`,
                        backgroundColor: "yellow"
                    }}
                >
                </div>
            </div>

            <p
                className="text-left w-1/6 pl-1"
                style={{
                    width: "10%"
                }}
            >
                ({percentageByRating.count})
            </p>
        </div>
    )
}
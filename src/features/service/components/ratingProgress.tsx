import { PercentageByRating } from "@/types/api/response/reviewsResponse";

type Props = {
    percentageByRating: PercentageByRating
}

export default function RatingProgress(props: Props) {
    const { percentageByRating } = props;
    return (
        <div className="flex w-full">
            <p
                className="text-center pr-2"
                style={{
                    width: "15%"
                }}
            >
                {'星' + percentageByRating.rating}
            </p>

            <div
                className="bg-gray-200 h-6 mb-6"
                style={{
                    width: "80%"
                }}
            >
                <div
                    className="h-full"
                    style={{
                        width: `${percentageByRating.percentage}%`,
                        backgroundColor: "yellow",
                    }}
                >
                </div>
            </div>
        </div>
    )
}
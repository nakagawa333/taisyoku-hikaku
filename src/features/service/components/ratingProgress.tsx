import { PercentageByRating } from "@/types/api/response/reviewsResponse";

type Props = {
    percentageByRating: PercentageByRating
}

export default function RatingProgress(props: Props) {
    const { percentageByRating } = props;
    return (
        <div className="flex w-[95%] m-auto">
            <p
                className="text-center pr-2 w-[12%] whitespace-nowrap font-bold"
                style={{
                    color: "#FFE87C"
                }}
            >
                {'星' + percentageByRating.rating}
            </p>

            <div
                className="bg-gray-200 h-4 mb-6 mt-1 rounded-[50px] w-[88%]"
            >
                <div
                    className="h-full rounded-[50px]"
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
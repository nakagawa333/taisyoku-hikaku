import { ServiceReview } from "@/constants/api/response/serviceResponse";
import StarRatings from "react-star-ratings";
import ReviewRating from "./reviewRating";

type Props = {
    review: ServiceReview
}

export default function Review(props: Props) {
    const { review } = props;
    return (
        <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <article className="w-11/12 mx-auto grid gap-4">
                <div className="grid grid-cols-2">
                    <p className="text-sm col-start-2 text-right">回答日: {review.createDay}</p>
                </div>

                <div className="grid grid-cols-[auto,1fr] items-center gap-2 rtl:space-x-reverse">
                    {
                        review.gender === "MEN" ? (
                            <img className="w-10 h-10 rounded-full" src="/men.jpg" alt="" />
                        ) : (
                            <img className="w-10 h-10 rounded-full" src="/women.jpg" alt="" />
                        )
                    }
                    <div className="font-medium">
                        <p>{review.name + "さん"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-[auto,1fr] items-center gap-2 rtl:space-x-reverse">
                    <p className="text-sm">{review.age}</p>
                    <p className="text-sm">{review.gender === "MEN" ? "男性" : "女性"}</p>
                </div>

                <div className="grid grid-cols-[auto,1fr] items-center gap-2 rtl:space-x-reverse">
                    <StarRatings
                        rating={review?.comprehensive_evaluation ? Number(review.comprehensive_evaluation) : 0}
                        numberOfStars={5}
                        name="rating"
                        starRatedColor="yellow"
                        starHoverColor="yellow"
                        starDimension="20px"
                        starSpacing="0px"
                    />
                    <h3 className="text-sm pt-1">{review.comprehensive_evaluation}</h3>
                </div>

                <ReviewRating
                    label="価格の満足度"
                    rating={review.price_satisfaction}
                />

                <ReviewRating
                    label="スピードの満足度"
                    rating={review.speed_satisfaction}
                />

                <ReviewRating
                    label="対応の満足度"
                    rating={review.response_satisfaction}
                />

                <ReviewRating
                    label="コスパの満足度"
                    rating={review.cost_performance_satisfaction}
                />

                <article className="break-words whitespace-normal">
                    <div className="mb-2 whitespace-pre-line">
                        <p className="text-pink-300">良い点:{review.goodTitle}</p>
                        <p className="text-pink-300">{review.goodDetail}</p>
                    </div>
                    <div className="">
                        <p className="text-sky-500">悪い点:{review.concernTitle}</p>
                        <p className="text-sky-500">{review.concernDetail}</p>
                    </div>
                </article>
            </article>
        </div>
    );
}

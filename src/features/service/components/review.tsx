import { ServiceReview } from "@/constants/api/response/serviceResponse";
import Image from 'next/image';
import StarRatings from "react-star-ratings";
import ReviewRating from "./reviewRating";

type Props = {
    review: ServiceReview
}

export default function Review(props: Props) {
    const { review } = props;
    return (

        <div className="w-[90%] mt-5 rounded border border-gray-200 m-auto">
            <div
                className="m-auto w-[95%] overflow-hidden max-w-xs md:max-w-3xl mb-10
                grid grid-cols-1 sm:grid-cols-3 gap-1s"
            >
                <div className="sm:col-span-3 mt-5 flex">
                    <p className="text-sm col-start-2 text-right ml-auto">回答日: {review.createDay}</p>
                </div>

                <div className="sm:col-span-3">
                    <div className="flex items-center gap-2">

                        {
                            review.gender === "MEN" ? (
                                <Image
                                    width={40}
                                    height={40}

                                    className="rounded-full"
                                    src="/men.jpg"
                                    alt=""
                                />
                            ) : (
                                <Image
                                    width={40}
                                    height={40}

                                    className="rounded-full"
                                    src="/women.jpg"
                                    alt=""
                                />
                            )
                        }
                        <div className="font-medium">
                            <p>{review.name + "さん"}</p>
                        </div>
                    </div>
                </div>

                <div className="sm:col-span-3 flex mt-2">
                    <div className="flex gap-2">
                        <p className="text-sm">{review.age}</p>
                        <p className="text-sm">{review.gender === "MEN" ? "男性" : "女性"}</p>
                    </div>
                </div>

                <div className="grid sm:col-span-3 grid-cols-3 mt-5">
                    <div className="col-span-3 sm:col-span-1 flex">
                        <StarRatings
                            rating={review?.comprehensive_evaluation ? Number(review.comprehensive_evaluation) : 0}
                            numberOfStars={5}
                            name="rating"
                            starRatedColor="yellow"
                            starHoverColor="yellow"
                            starDimension="30px"
                            starSpacing="0px"
                        />
                        <h1 className="text-lg pt-1 pl-2">{review.comprehensive_evaluation}</h1>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
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
                    </div>
                </div>

                <div className="border-b-2 grid sm:col-span-3 grid-cols-3 mt-5">

                </div>

                <div className="break-words whitespace-normal grid sm:col-span-3 mt-5 mb-3">
                    <div className="mb-2 whitespace-pre-line">
                        <div className="flex">
                            <Image
                                width={20}
                                height={20}
                                className="rounded-full"
                                src="/good.svg"
                                alt=""
                            />

                            <div className="flex">
                                <p className="text-pink-300 pl-1">良い点:</p>
                                <p className="text-pink-300 pl-1">
                                    {review.goodTitle}
                                </p>
                            </div>

                        </div>
                        <p className="">{review.goodDetail}</p>
                    </div>
                    <div className="mb-2 whitespace-pre-line">
                        <div className="flex">
                            <Image
                                width={20}
                                height={20}
                                className="rounded-full"
                                src="/bad.svg"
                                alt=""
                            />
                            <div className="flex">
                                <p className="text-sky-500 pl-1">悪い点:</p>
                                <p className="text-sky-500 pl-1">
                                    {review.concernTitle}
                                </p>
                            </div>
                        </div>
                        <p className="">{review.concernDetail}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

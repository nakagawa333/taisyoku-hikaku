import { ServiceReview } from "@/constants/api/response/serviceResponse";
import StarRatings from "react-star-ratings";

type Props = {
    review: ServiceReview
}

export default function Review(props: Props) {
    const { review } = props;
    return (
        <>
            <article key={review.reviewId}>
                <div className="flex items-center mb-4">
                    {
                        review.gender === "MEN" ? (
                            <img className="w-10 h-10 me-4 rounded-full" src="/men.jpg" alt="" />
                        ) : (
                            <img className="w-10 h-10 me-4 rounded-full" src="/women.jpg" alt="" />
                        )
                    }
                    <div className="font-medium">
                        <p> {review.name} <p className="block text-sm">{review.createDay}</p></p>
                    </div>
                </div>

                <div className="pointer-events-none flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                    <StarRatings
                        rating={review.rating}
                        numberOfStars={5}
                        name='rating'
                        starRatedColor="yellow"
                        starHoverColor="yellow"
                        ignoreInlineStyles={false}
                        starDimension="14px"
                        starSpacing="0px"
                    />

                    <h3 className="ms-2 text-sm pt-1">
                        {review.title}
                    </h3>
                </div>

                <article className="break-words break-all whitespace-normal">
                    <p className="mb-2 whitespace-pre-line">
                        {review.review}
                    </p>
                </article>
            </article>

        </>
    )
}

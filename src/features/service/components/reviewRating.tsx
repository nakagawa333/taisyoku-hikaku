import StarRatings from "react-star-ratings";

type Props = {
    label: string
    rating: number
}

export default function ReviewRating(props: Props) {
    const { label, rating } = props;

    return (
        <div className="grid grid-cols-3 items-center gap-2 rtl:space-x-reverse">
            <p className="text-sm pt-1">{label}</p>
            <StarRatings
                rating={rating}
                numberOfStars={5}
                name="rating"
                starRatedColor="yellow"
                starHoverColor="yellow"
                starDimension="16px"
                starSpacing="0px"
            />
            <p className="text-sm pt-1">{rating}</p>
        </div>
    )
}
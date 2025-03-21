import StarRatings from "react-star-ratings";

type Props = {
    label: string
    rating: number
}

export default function ReviewRating(props: Props) {
    const { label, rating } = props;

    return (
        <div className="grid grid-cols-3 items-center gap-2 rtl:space-x-reverse">
            <p className="text-sm pt-1 sm:col-span-1">{label}</p>
            <div className="sm:col-span-2 flex">
                <div className="pb-1">
                    <StarRatings
                        rating={rating}
                        numberOfStars={5}
                        name="rating"
                        starRatedColor="yellow"
                        starHoverColor="yellow"
                        starDimension="16px"
                        starSpacing="0px"
                    />
                </div>


                <p className="text-sm pt-1 pl-2">{rating}</p>
            </div>

        </div>
    )
}
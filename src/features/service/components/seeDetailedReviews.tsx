import { RefObject } from "react";

type Props = {
    reviewRef: RefObject<HTMLDivElement>
}
//詳しい口コミを見るボタン
export default function SeeDetailedReviews(props: Props) {
    const { reviewRef } = props;
    const reviewWriteButtonStyle = {
        "&:hover": {
            background: "#289CAC"
        },
        borderColor: "#289CAC",
        color: "#289CAC",
    }

    /**
     * 口コミを書くボタンクリック時
     */
    const detailButtonClick = () => {
        reviewRef?.current?.scrollIntoView();
    }


    return (
        <div className="bg-white-fff ml-auto self-stretch bg-white-fff overflow-hidden flex flex-row items-start justify-start py-[30px] px-5">
            <button
                className="border bg-white font-bold py-2 px-4 rounded text-white cursor-pointer py-4 px-5 flex-1 flex flex-row items-start justify-center"
                style={reviewWriteButtonStyle}
                onClick={() => detailButtonClick()}
            >
                詳しい口コミを見る
            </button>
        </div>
    )
}
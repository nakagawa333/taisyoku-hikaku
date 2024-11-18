import { Dispatch, SetStateAction } from "react";
import { usePostReview } from "../hooks/usePostReview";
import ContributorInformation from "./contributorInformation";
import ReviewContent from "./reviewContent";
import Satisfactions from "./satisfactions";

type Props = {
    id: string
    setSnackbarData: Dispatch<SetStateAction<any>>
}

//コメント投稿
export default function PostReview(props: Props) {

    const { id, setSnackbarData } = props;
    const [{ postReviewSubmit, postReviewInputOnChange,
        postReviewData, setPostReviewData,
        postReviewSelectOnChange, changeReviewRating, reviewChange }] = usePostReview(id, setSnackbarData);
    //名前最大文字数
    const nameMaxLength: number = 30;
    //性別最大文字数
    const genderMaxLength: number = 50;
    //レビュー最大文字数
    const reviewMaxLength: number = 400;

    return (
        <div className="px-5">

            <form onSubmit={postReviewSubmit}>

                <Satisfactions
                />

                <ReviewContent

                />

                <ContributorInformation

                />

                {/* <div>
                    <div className="flex">
                        <p>名前</p>
                        <p className="text-red-500">(必須)</p>
                    </div>
                    <div>
                        <input
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            maxLength={nameMaxLength}
                            required
                            value={postReviewData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => postReviewInputOnChange(e, "name")}
                        >

                        </input>
                    </div>
                </div>
                <div>
                    <div className="mt-3">
                        <p>評価</p>
                        <div className="flex">
                            <StarRatings
                                rating={postReviewData.reviewRating}
                                changeRating={changeReviewRating}
                                numberOfStars={5}
                                name='rating'
                                starRatedColor="yellow"
                                starHoverColor="yellow"
                                ignoreInlineStyles={false}
                                starDimension="14px"
                                starSpacing="0px"
                            />

                            <p className="text-xs px-2 py-1.5">{postReviewData.reviewRating}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="flex">
                        <p>性別</p>
                        <p className="text-red-500">(必須)</p>
                    </div>
                    <select
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => postReviewSelectOnChange(e, "gender")}
                    >
                        <option value="MEN" selected={postReviewData.gender === "MEN"}>男性</option>
                        <option value="WOMEN" selected={postReviewData.gender === "WOMEN"}>女性</option>
                    </select>
                </div>
                <div className="mt-3">
                    <div className="flex">
                        <p>タイトル</p>
                        <p className="text-red-500">(必須)</p>
                    </div>
                    <div>
                        <input
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            maxLength={genderMaxLength}
                            required
                            value={postReviewData.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => postReviewInputOnChange(e, "title")}
                        />

                    </div>
                </div>
                <div className="mt-3">
                    <div className="flex">
                        <p>口コミ</p>
                        <p className="text-red-500">(必須)</p>
                    </div>
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                        <label className="sr-only">口コミを投稿</label>
                        <textarea
                            id="comment"
                            rows={6}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                            placeholder=""
                            maxLength={reviewMaxLength}
                            onChange={reviewChange}
                            value={postReviewData.review}
                            required>
                        </textarea>
                    </div>
                    <div className="">
                        <p className="text-xs">{postReviewData.reviewCharacterCount}/{reviewMaxLength}文字</p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-stone-300 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        >
                            投稿
                        </button>
                    </div>
                </div> */}
            </form>
        </div>
    )
}
import Loading from "@/components/loading";
import ReviewDeleteConfirmModal from "@/components/modal/confirm/review/delete/reviewDeleteConfirmModal";
import Snackbar from "@/components/snackbar";
import { ServiceReview } from "@/constants/api/response/serviceResponse";
import Image from 'next/image';
import StarRatings from "react-star-ratings";
import { useReview } from "../hooks/useReview";
import ReviewRating from "./reviewRating";

type Props = {
    review: ServiceReview
}

//TODO 削除機能実装(クリック時:削除ダイアログ表示、OKクリック時実際に削除する APIも実装する必要あり)
export default function Review(props: Props) {
    const { review } = props;

    const { snackbarData, openDeleteModal, isLoadingOpen, setOpenDeleteModal, onConfirmDelete, closeSuccessSnackbar } = useReview({ review });
    return (

        <>
            <Loading isOpen={isLoadingOpen} />
            <div className="w-[90%] mt-5 rounded border border-gray-200 m-auto">
                <div
                    className="m-auto w-[95%] overflow-hidden max-w-xs md:max-w-3xl
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

                    <div className="break-words whitespace-normal grid sm:col-span-3 mt-5">
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

                        {
                            review.isUser ? (
                                <div className="flex justify-start gap-2 mt-5 mb-5">
                                    <button
                                        type="button"
                                        className="text-white bg-blue-400 dark:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        onClick={() => setOpenDeleteModal(true)}
                                    >
                                        削除
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white bg-blue-400 dark:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                        編集
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )
                        }


                        <Snackbar
                            state={snackbarData.state}
                            message={snackbarData.message}
                            time={snackbarData.time}
                            isOpen={snackbarData.isOpen}
                            onClose={closeSuccessSnackbar}
                        />

                        <ReviewDeleteConfirmModal
                            openDeleteModal={openDeleteModal}
                            setOpenDeleteModal={setOpenDeleteModal}
                            onConfirmDelete={onConfirmDelete}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

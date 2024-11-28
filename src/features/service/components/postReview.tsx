import CloseButton from "@/components/button/closeButton";
import Heading from "@/components/heading";
import { NotesForReviewSubmission } from "@/components/precautions/NotesForReviewSubmission";
import { PostReviewType } from "@/types/ui/service/postPreview";
import { createContext, Dispatch, SetStateAction } from "react";
import { usePostReview } from "../hooks/usePostReview";
import ContributorInformation from "./contributorInformation";
import ReviewContent from "./reviewContent";
import Satisfactions from "./satisfactions";

type Props = {
    id: string
    setSnackbarData: Dispatch<SetStateAction<any>>
    openWriteReview: boolean
    setOpenWriteReview: Dispatch<SetStateAction<boolean>>
}

export const PostReviewContext = createContext<PostReviewType | null>(null);

//コメント投稿
export default function PostReview(props: Props) {

    const { id, setSnackbarData, openWriteReview, setOpenWriteReview } = props;
    const { options, selectAgeId, setSelectAgeId,
        postReviewSubmit, nickName, setNickName, gender, setGender,
        goodTitle, setgoodTitle, goodTitleDetail, setgoodTitleDetail,
        concernTitle, setconcernTitle, concernTitleDetail, setconcernTitleDetail, closeButtonClick,
        priceSatisfaction, setPriceSatisfaction, speedSatisfaction, setSpeedSatisfaction,
        responseSatisfaction, setResponseSatisfaction, costPerformanceSatisfaction, setCostPerformanceSatisfaction
    } = usePostReview(id, setSnackbarData, setOpenWriteReview);


    return (
        <>
            {
                openWriteReview ? (
                    <div
                        className="px-5"
                        style={{
                            position: "fixed",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            top: 0,
                            zIndex: 1000,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            transition: "transform 0.3s ease-in-out",
                            transform: openWriteReview ? "translateY(0)" : "translateY(100%)"
                        }}
                    >

                        <PostReviewContext.Provider value={{
                            selectAgeId, setSelectAgeId, options,
                            nickName, setNickName, gender, setGender,
                            goodTitle, setgoodTitle, goodTitleDetail, setgoodTitleDetail,
                            concernTitle, setconcernTitle, concernTitleDetail, setconcernTitleDetail,
                            priceSatisfaction, setPriceSatisfaction, speedSatisfaction, setSpeedSatisfaction,
                            responseSatisfaction, setResponseSatisfaction, costPerformanceSatisfaction, setCostPerformanceSatisfaction
                        }}>
                            <form
                                onSubmit={postReviewSubmit}
                                style={{
                                    backgroundColor: "#fff",
                                    padding: "20px",
                                    width: "100%",
                                    maxWidth: "500px",
                                    maxHeight: "100%", // モーダルの最大高さを指定
                                    overflowY: "auto", // 高さが超えた場合にスクロール可能に
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "8px",
                                }}
                            >

                                <div className="flex justify-end">
                                    <CloseButton
                                        closeButtonClick={closeButtonClick}
                                    />
                                </div>

                                <Heading
                                    title="口コミを投稿する"
                                />

                                <Satisfactions
                                />

                                <ReviewContent

                                />

                                <ContributorInformation

                                />
                                <div className="mt-2">
                                    <NotesForReviewSubmission />
                                </div>


                                <div className="self-stretch bg-white-fff overflow-hidden flex flex-row items-start justify-start py-[30px] px-5">
                                    <button
                                        className="text-white cursor-pointer [border:none] py-4 px-5 bg-blue-289cac flex-1 flex flex-row items-start justify-center"
                                        style={{
                                            background: "#289CAC",
                                            color: "white"
                                        }}
                                    >
                                        <b className="relative text-lg inline-block font-yugothic text-left min-w-[72px]">
                                            口コミを投稿する
                                        </b>
                                    </button>
                                </div>
                            </form>

                        </PostReviewContext.Provider>
                    </div>
                ) : null}
        </>
    )
}
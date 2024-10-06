import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQueryReviews } from "@/hooks/reactQuery/comments";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    initialData: any
}

export function usePostReview(id: string, setSnackbarData: Dispatch<SetStateAction<any>>) {
    const [postReviewData, setPostReviewData] = useState<any>({
        reviewCharacterCount: 0,
        name: "",
        reviewRating: 5,
        gender: "MEN",
        title: "",
        review: "",
    });

    const queryClient = useQueryClient();

    const [{ createReview }] = useQueryReviews();
    const reviewWithArgs = createReview();

    /**
     * 口コミ投稿する
     * @param e 
     * @returns 
     */
    const postReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const reviewData = {
            serviceId: id,
            name: postReviewData.name.trim(),
            rating: postReviewData.reviewRating,
            gender: postReviewData.gender,
            title: postReviewData.title.trim(),
            review: postReviewData.review.trim()
        }

        try {
            const res = await reviewWithArgs.mutateAsync(reviewData);
        } catch (error: any) {
            console.error(error);
            setSnackbarData({
                state: "error",
                message: "口コミ投稿に失敗しました",
                time: 5000,
                isOpen: true
            })
            return;
        }

        setSnackbarData({
            state: "success",
            message: "口コミ投稿に成功しました",
            time: 5000,
            isOpen: true
        })

        //値の初期化
        setPostReviewData({
            reviewCharacterCount: 0,
            name: "",
            reviewRating: 5,
            gender: "MEN",
            title: "",
            review: "",
        });

        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICEREVIEWS] });
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICEREVIEWSMETADATA] });
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.PERCENTAGEBYRATINGS] });
    }

    /**
     * 口コミ入力値変更イベント
     * @param e 変更イベント
     * @param element 要素
     */
    const postReviewInputOnChange = (e: React.ChangeEvent<HTMLInputElement>, element: string) => {
        const value: string = e.target.value;
        if (postReviewData.hasOwnProperty(element)) {
            const copyPostReviewData = JSON.parse(JSON.stringify(postReviewData));
            copyPostReviewData[element] = value;
            setPostReviewData(copyPostReviewData);
        }
    }

    /**
     * 口コミセレクトボックス変更時イベント
     * @param e 変更イベント
     * @param element 要素
     */
    const postReviewSelectOnChange = (e: React.ChangeEvent<HTMLSelectElement>, element: string) => {
        const value: string = e.target.value;
        if (postReviewData.hasOwnProperty(element)) {
            const copyPostReviewData = JSON.parse(JSON.stringify(postReviewData));
            copyPostReviewData[element] = value;
            setPostReviewData(copyPostReviewData);
        }
    }

    /**
     * レビュー入力欄変更時
     * @param value 入力値
     */
    const reviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value: string = e.target.value;
        const copyPostReviewData = JSON.parse(JSON.stringify(postReviewData));
        copyPostReviewData["review"] = value;
        copyPostReviewData["reviewCharacterCount"] = value.length
        setPostReviewData(copyPostReviewData);
    }

    /**
     * 口コミ評価変更イベント
     * @param rating 評価
     */
    const changeReviewRating = (rating: number) => {
        const copyPostReviewData = JSON.parse(JSON.stringify(postReviewData));
        copyPostReviewData["reviewRating"] = rating;

        setPostReviewData(copyPostReviewData)
    }

    return [{
        postReviewData,
        setPostReviewData,
        postReviewSubmit,
        postReviewInputOnChange,
        postReviewSelectOnChange,
        changeReviewRating,
        reviewChange
    }]
}
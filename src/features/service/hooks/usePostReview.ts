import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { ContributorInformationAgeOption, ContributorInformationAgeOptions } from "@/constants/ui/contributorInformation";
import { useQueryReviews } from "@/hooks/reactQuery/comments";
import { Gender } from "@/types/ui/service/gender";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    initialData: any;
};

type ReviewFormState = {
    selectAgeId: number;
    nickName: string;
    gender: Gender;
    goodTitle: string;
    goodTitleDetail: string;
    concernTitle: string;
    concernTitleDetail: string;
    priceSatisfaction: number;
    speedSatisfaction: number;
    responseSatisfaction: number;
    costPerformanceSatisfaction: number;
    errorSatisfactionsMessage: string
};

// 初期値の定義
const initialReviewFormState: ReviewFormState = {
    selectAgeId: ContributorInformationAgeOptions.lateTeens.id,
    nickName: "",
    gender: "MEN",
    goodTitle: "",
    goodTitleDetail: "",
    concernTitle: "",
    concernTitleDetail: "",
    priceSatisfaction: 0,
    speedSatisfaction: 0,
    responseSatisfaction: 0,
    costPerformanceSatisfaction: 0,
    errorSatisfactionsMessage: "" //満足度 エラーメッセージ
};

export function usePostReview(
    id: string,
    setSnackbarData: Dispatch<SetStateAction<any>>,
    setOpenWriteReview: Dispatch<SetStateAction<boolean>>
) {
    const options: ContributorInformationAgeOption[] = [
        ContributorInformationAgeOptions.lateTeens,
        ContributorInformationAgeOptions.twentiy,
        ContributorInformationAgeOptions.third,
        ContributorInformationAgeOptions.four,
        ContributorInformationAgeOptions.five,
        ContributorInformationAgeOptions.beyond,
    ];

    //エラーメッセージ
    const [isOpenErrorSnackbar, setIsOpenErrorSnackbar] = useState<boolean>(false);
    const [partialLoadingFlag, setPartialLoadingFlag] = useState<boolean>(false);
    const [reviewForm, setReviewForm] = useState<ReviewFormState>(initialReviewFormState);

    const queryClient = useQueryClient();
    const [{ createReview }] = useQueryReviews();
    const reviewWithArgs = createReview();
    /**
     * フォームのフィールドを更新する関数
     */
    const updateFormField = <T extends keyof ReviewFormState>(field: T, value: ReviewFormState[T]) => {
        setReviewForm((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    /**
     * フォームリセット
     */
    const resetForm = () => {
        setReviewForm(initialReviewFormState);
    };

    /**
     * 閉じるアイコンクリック時
     */
    const closeButtonClick = () => {
        setOpenWriteReview(false);
        resetForm();
    };

    /**
     * 口コミ投稿
     * @param e イベント
     * @returns
     */
    const postReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!reviewForm.priceSatisfaction || !reviewForm.speedSatisfaction
            || !reviewForm.responseSatisfaction || !reviewForm.costPerformanceSatisfaction
        ) {
            setIsOpenErrorSnackbar(true);
            return;
        }

        setPartialLoadingFlag(true);

        const {
            selectAgeId,
            nickName,
            gender,
            goodTitle,
            goodTitleDetail,
            concernTitle,
            concernTitleDetail,
            priceSatisfaction,
            speedSatisfaction,
            responseSatisfaction,
            costPerformanceSatisfaction,
        } = reviewForm;

        // 総合評価
        const comprehensiveEvaluation =
            (priceSatisfaction + speedSatisfaction + responseSatisfaction + costPerformanceSatisfaction) / 4;

        const reviewData = {
            serviceId: id,
            name: nickName,
            goodTitle,
            goodDetail: goodTitleDetail,
            concernTitle,
            concernDetail: concernTitleDetail,
            gender,
            priceSatisfaction,
            speedSatisfaction,
            responseSatisfaction,
            costPerformanceSatisfaction,
            comprehensiveEvaluation,
            contributorYearsId: selectAgeId,
        };

        try {
            const res = await reviewWithArgs.mutateAsync(reviewData);
        } catch (error: any) {
            console.error(error);
            setSnackbarData({
                state: "error",
                message: "口コミ投稿に失敗しました",
                time: 5000,
                isOpen: true,
            });

            setPartialLoadingFlag(false);
            return;
        }

        setSnackbarData({
            state: "success",
            message: "口コミ投稿に成功しました",
            time: 5000,
            isOpen: true,
        });

        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICEREVIEWS] });
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICEREVIEWSMETADATA] });
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.PERCENTAGEBYRATINGS] });
        setOpenWriteReview(false);
        setPartialLoadingFlag(false);
        resetForm(); // フォームのリセット
    };

    return {
        isOpenErrorSnackbar,
        setIsOpenErrorSnackbar,
        partialLoadingFlag,
        options,
        reviewForm,
        setReviewForm,
        updateFormField,
        postReviewSubmit,
        closeButtonClick,
    };
}

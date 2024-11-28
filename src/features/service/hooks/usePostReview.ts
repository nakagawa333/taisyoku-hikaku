import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { ContributorInformationAgeOption, ContributorInformationAgeOptions } from "@/constants/ui/contributorInformation";
import { useQueryReviews } from "@/hooks/reactQuery/comments";
import { Gender } from "@/types/ui/service/gender";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    initialData: any
}

export function usePostReview(id: string, setSnackbarData: Dispatch<SetStateAction<any>>,
    setOpenWriteReview: Dispatch<SetStateAction<boolean>>) {
    const options: ContributorInformationAgeOption[] = [
        ContributorInformationAgeOptions.lateTeens,
        ContributorInformationAgeOptions.twentiy,
        ContributorInformationAgeOptions.third,
        ContributorInformationAgeOptions.four,
        ContributorInformationAgeOptions.five,
        ContributorInformationAgeOptions.beyond
    ]

    //選択した年齢
    const [selectAgeId, setSelectAgeId] = useState<number>(ContributorInformationAgeOptions.lateTeens.id);

    //ニックーネーム
    const [nickName, setNickName] = useState<string>("");

    //性別
    const [gender, setGender] = useState<Gender>("MEN");

    //良い点
    const [goodTitle, setgoodTitle] = useState<string>("");

    //良い点詳細
    const [goodTitleDetail, setgoodTitleDetail] = useState<string>("");

    //悪い点
    const [concernTitle, setconcernTitle] = useState<string>("");

    //悪い点詳細
    const [concernTitleDetail, setconcernTitleDetail] = useState<string>("");

    //価格の満足度
    const [priceSatisfaction, setPriceSatisfaction] = useState<number>(0);

    //スピードの満足度
    const [speedSatisfaction, setSpeedSatisfaction] = useState<number>(0);

    //対応の満足度
    const [responseSatisfaction, setResponseSatisfaction] = useState<number>(0);

    //コスパの満足度
    const [costPerformanceSatisfaction, setCostPerformanceSatisfaction] = useState<number>(0);

    const queryClient = useQueryClient();

    const [{ createReview }] = useQueryReviews();
    const reviewWithArgs = createReview();

    /**
     * 閉じるアイコンクリック時
     */
    const closeButtonClick = () => {
        setOpenWriteReview(false)
    }

    /**
     * 口コミ投稿
     * @param e イベント
     * @returns 
     */
    const postReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //総合評価
        const comprehensiveEvaluation = (priceSatisfaction + speedSatisfaction + responseSatisfaction + costPerformanceSatisfaction) / 4
        const reviewData = {
            serviceId: id,
            name: nickName,
            goodTitle: goodTitle,
            goodDetail: goodTitleDetail,
            concernTitle: concernTitle,
            concernDetail: concernTitleDetail,
            gender: gender,
            priceSatisfaction: priceSatisfaction,
            speedSatisfaction: speedSatisfaction,
            responseSatisfaction: responseSatisfaction,
            costPerformanceSatisfaction: costPerformanceSatisfaction,
            comprehensiveEvaluation: comprehensiveEvaluation,
            contributorYearsId: selectAgeId
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

        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICEREVIEWS] });
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICEREVIEWSMETADATA] });
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.PERCENTAGEBYRATINGS] })
        setOpenWriteReview(false);
    }


    return {
        options, selectAgeId, setSelectAgeId,
        postReviewSubmit,
        nickName, setNickName,
        gender, setGender,
        goodTitle, setgoodTitle, goodTitleDetail, setgoodTitleDetail,
        concernTitle, setconcernTitle, concernTitleDetail, setconcernTitleDetail,
        closeButtonClick,
        priceSatisfaction, setPriceSatisfaction, speedSatisfaction, setSpeedSatisfaction,
        responseSatisfaction, setResponseSatisfaction, costPerformanceSatisfaction, setCostPerformanceSatisfaction
    }
}
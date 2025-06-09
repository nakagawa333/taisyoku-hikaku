import { ServiceReview } from "@/constants/api/response/serviceResponse";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQueryReviews } from "@/hooks/reactQuery/comments";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
    review: ServiceReview
}
export function useReview(props: Props) {
    const { review } = props;
    //削除確認モーダルの表示状態
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    //ローディング表示状態
    const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
    const [snackbarData, setSnackbarData] = useState<any>({
        state: "",
        message: "",
        time: 0,
        isOpen: false,
    });
    const [{ useQueryDeleteReview }] = useQueryReviews();
    const reviewWithArgs = useQueryDeleteReview();

    const queryClient = useQueryClient();


    /**
     * ユーザーが削除の確認ダイアログで「はい」を押したときに呼ばれるハンドラー。
     * 実際の削除処理やAPIコールをここで実行する。
     *
     * @returns {void}
     */
    const onConfirmDelete = async () => {
        setIsLoadingOpen(true);
        try {
            //口コミ削除処理
            await reviewWithArgs.mutateAsync({ reviewId: review.reviewId });
        } catch (error: any) {
            setIsLoadingOpen(false);

            //エラー用スナックバー表示
            setSnackbarData({
                state: "error",
                message: "口コミ削除に失敗しました",
                time: 5000,
                isOpen: true,
            });

            return;
        }

        //口コミ一覧再取得
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICEREVIEWS] });
        //口コミの評価再取得
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.PERCENTAGEBYRATINGS] });

        //削除確認モーダル非表示
        setOpenDeleteModal(false);
        //ローディング画面非表示
        setIsLoadingOpen(false);

        //成功用スナックバー表示
        setSnackbarData({
            state: "success",
            message: "口コミ削除に成功しました",
            time: 5000,
            isOpen: true,
        });
    }

    /**
     * スナックバーが閉じた際の処理
     * @return {void}
     */
    const closeSuccessSnackbar = () => {
        setSnackbarData({
            state: "",
            message: "",
            time: 0,
            isOpen: false,
        });
    }

    return { snackbarData, openDeleteModal, isLoadingOpen, setOpenDeleteModal, onConfirmDelete, closeSuccessSnackbar }
}
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { SnackbarData } from "@/types/ui/snackbar/snackbarData";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useQueryAuth } from "../reactQuery/auth";
import { useQuerySignout } from "../reactQuery/signout";

/**
 * ヘッダーコンポーネントHooks
 * @returns 
 */
export default function useHeaders() {
    const { useAuthState } = useQueryAuth();

    const [partialLoadingFlag, setPartialLoadingFlag] = useState<boolean>(false);

    const [snackbarData, setSnackbarData] = useState<SnackbarData>({
        state: "",
        message: "",
        time: 0,
        isOpen: false
    });

    //ログイン状態取得
    const authState = useAuthState();
    //データ
    const useAuthStateData = authState.data;
    //ローディング
    const useAuthStateLoaing = authState.isLoading;
    //エラー
    const useAuthStateIsError = authState.isError;

    const useAuthStateIsFetchedAfterMount = authState.isFetchedAfterMount;

    const { useQueryExeSignout } = useQuerySignout();
    //サインアウト
    const signoutWithArgs = useQueryExeSignout();
    const queryClient = useQueryClient();

    /**
     * ログアウトボタンクリック時
     */
    const logOutButtonClick = async () => {
        setPartialLoadingFlag(true);

        try {
            //サインアウトを行う
            await signoutWithArgs.mutateAsync({});

            //ログイン可否情報再取得
            queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.AUTH_STATE] })
        } catch (ex: any) {
            setSnackbarData({
                state: "error",
                message: "サインアウトに失敗しました",
                time: 5000,
                isOpen: true,
            });
            setPartialLoadingFlag(false);
            return;
        }


        setSnackbarData({
            state: "success",
            message: "サインアウトしました",
            time: 5000,
            isOpen: true,
        });
        setPartialLoadingFlag(false);
    }

    /**
     * スナックバーを表示する
     */
    const closeSuccessSnackbar = () => {
        setSnackbarData({
            state: "",
            message: "",
            time: 0,
            isOpen: false
        })
    }

    return {
        partialLoadingFlag, useAuthStateData, useAuthStateLoaing,
        useAuthStateIsError, useAuthStateIsFetchedAfterMount, snackbarData,
        closeSuccessSnackbar, logOutButtonClick
    }
}
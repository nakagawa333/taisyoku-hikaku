import ReactQueryKeys from "@/constants/common/reactQueryKeys";
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
        //サインアウトを行う
        await signoutWithArgs.mutateAsync({});

        //ログイン可否情報再取得
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.AUTH_STATE] })
        setPartialLoadingFlag(false);
    }

    return { partialLoadingFlag, setPartialLoadingFlag, useAuthStateData, useAuthStateLoaing, useAuthStateIsError, useAuthStateIsFetchedAfterMount, logOutButtonClick }
}
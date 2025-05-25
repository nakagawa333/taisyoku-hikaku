import { Paths } from "@/constants/common/paths";
import { useQueryAuth } from "@/hooks/reactQuery/auth";
import { SnackbarData } from "@/types/ui/snackbar/snackbarData";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuthInit() {
    const { useAuthState } = useQueryAuth();
    const router = useRouter();
    const searchParams: ReadonlyURLSearchParams | null = useSearchParams();

    const [snackbarData, setSnackbarData] = useState<SnackbarData>({
        state: "",
        message: "",
        time: 0,
        isOpen: false
    });

    //ログイン状態取得
    const { data: useAuthStateData
        , isLoading: useAuthStateLoaing, isError: useAuthStateIsError
    } = useAuthState();

    useEffect(() => {
        //URLのハッシュ値を削除
        removeUrlHash();
        if (useAuthStateIsError) {
            setSnackbarData({
                state: "error",
                message: "ログインに失敗しました",
                time: 2000,
                isOpen: true
            });
        }
    }, [useAuthStateIsError])

    useEffect(() => {
        if (!useAuthStateLoaing && useAuthStateData) {
            if (useAuthStateData.isLogin) {

                setSnackbarData({
                    state: "success",
                    message: "ログインに成功しました",
                    time: 2000,
                    isOpen: true
                });
            } else {
                setSnackbarData({
                    state: "error",
                    message: "ログインに失敗しました",
                    time: 2000,
                    isOpen: true
                })
            }
        }
    }, [useAuthStateLoaing]);

    /**
     * URLのハッシュ値を削除する
     * @returns {void}
     */
    const removeUrlHash = () => {
        // 現在のURLからハッシュを除去したURLを作る
        const cleanUrl = window.location.href.split('#')[0];

        // ハッシュを削除してURLを書き換え（ページ遷移はしない）
        window.history.replaceState(null, '', cleanUrl);
    }

    /**
     * スナックバーを閉じる
     * @returns {void}
     */
    const closeSuccessSnackbar = () => {
        setSnackbarData({
            state: "",
            message: "",
            time: 0,
            isOpen: false
        })

        //トップページにリダイレクト
        router.replace(Paths.HOME);
    }

    return {
        snackbarData, closeSuccessSnackbar
    }
}
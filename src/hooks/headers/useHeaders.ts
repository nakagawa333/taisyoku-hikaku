import { AuthContext } from "@/providers/authProviders";
import { SnackbarData } from "@/types/ui/snackbar/snackbarData";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
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

    const { useQueryExeSignout } = useQuerySignout();
    //サインアウト
    const signoutWithArgs = useQueryExeSignout();
    const queryClient = useQueryClient();

    //認証
    const authCcontext = useContext(AuthContext);
    //ログイン情報
    const { isLoggedIn, setLoggedIn } = authCcontext;

    /**
     * ログアウトボタンクリック時
     */
    const logOutButtonClick = async () => {
        setPartialLoadingFlag(true);

        try {
            //サインアウトを行う
            await signoutWithArgs.mutateAsync({});

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

        //ログイン状態をサインアウト状態に変更
        setLoggedIn(false);

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
        partialLoadingFlag, snackbarData,
        closeSuccessSnackbar, logOutButtonClick
    }
}
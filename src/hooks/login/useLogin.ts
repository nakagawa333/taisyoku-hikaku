import { HttpStatus } from "@/constants/common/httpStatus";
import { SnackbarData } from "@/types/ui/snackbar/snackbarData";
import { FormEvent, useRef, useState } from "react";
import { useQueryAuth } from "../reactQuery/auth";

/**
 * ログイン画面用Hook
 * @returns 
 */
export default function useLogin() {

    //メールアドレス送信フォーム表示・非表示
    const [isDisplayMailForm, setIsDisplayMailForm] = useState<boolean>(false);
    //エラーメッセージ
    const [errorSnackbarMsg, setErrorSnackbarMsg] = useState<string>("入力されていない項目があります");
    const [isOpenErrorSnackbar, setIsOpenErrorSnackbar] = useState<boolean>(false);

    const [snackbarData, setSnackbarData] = useState<SnackbarData>({
        state: "",
        message: "",
        time: 0,
        isOpen: false
    });

    //メールアドレス
    const mailRef = useRef<HTMLInputElement>(null);

    const turnstileRef = useRef<any>(null);
    const turnstileToken = useRef<string>("");

    const { useQuerySendMagiclink } = useQueryAuth();
    const sendMagiclinkWithArgs = useQuerySendMagiclink();

    /**
     * メールアドレス送信フォームを表示する
     */
    const showMagicLinkForm = () => {
        setIsDisplayMailForm(true);
    }

    /**
     * 認証成功時
     * @param newToken 新しいトークン
     */
    const onSuccess = (newToken: string) => {
        if (turnstileRef?.current) {
            turnstileToken.current = newToken
        }
    }

    /**
     * 送信クリック時
     * @param e イベント
     * @returns
     */
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //cloudflare turnstileの認証失敗時
        if (!turnstileToken?.current) {
            setSnackbarData({
                state: "error",
                message: "認証に失敗しました",
                time: 5000,
                isOpen: true,
            });
            return;
        }

        const data = {
            email: mailRef.current?.value,
            token: turnstileToken.current
        }

        try {
            //マジックリンクを送信する
            await sendMagiclinkWithArgs.mutateAsync(data);
        } catch (error: any) {
            const status = error.response?.status;
            //認証再度実施
            turnstileRef.current?.reset();
            //トークン初期化
            if (turnstileToken?.current) {
                turnstileToken.current = "";
            }

            //エラーメッセージ
            const errorMessage: string = status === HttpStatus.BAD_REQUEST ? "メールアドレスは既に登録されています" : "メールの送信に失敗しました";

            setSnackbarData({
                state: "error",
                message: errorMessage,
                time: 5000,
                isOpen: true,
            });
            return;
        }

        setSnackbarData({
            state: "success",
            message: "ログイン用リンクをメールで送信しました",
            time: 5000,
            isOpen: true,
        });

        //認証再度実施
        turnstileRef.current?.reset();

        //フォーム、トークン初期化
        clearForm();
    }

    /**
     * フォーム初期化
     */
    const clearForm = () => {
        //メールアドレス初期化
        if (mailRef?.current?.value) {
            mailRef.current.value = "";
        }
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
        snackbarData, isDisplayMailForm, mailRef, turnstileRef,
        onSubmit, onSuccess, showMagicLinkForm, closeSuccessSnackbar
    }
}
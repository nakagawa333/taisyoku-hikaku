import { FormEvent, useRef, useState } from "react";

export default function useContact() {

    //メールアドレス
    const mailRef = useRef<HTMLInputElement>(null);

    //名前
    const nameRef = useRef<HTMLInputElement>(null);
    //お問い合わせ内容
    const inquiryDetailsRef = useRef<HTMLTextAreaElement>(null);

    //エラーメッセージ
    const [errorSnackbarMsg, setErrorSnackbarMsg] = useState<string>("入力されていない項目があります");
    const [isOpenErrorSnackbar, setIsOpenErrorSnackbar] = useState<boolean>(false);
    const [partialLoadingFlag, setPartialLoadingFlag] = useState<boolean>(false);

    const turnstileRef = useRef<any>(null);
    const turnstileToken = useRef<string>("");

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
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!turnstileToken || !turnstileToken.current) {
            setErrorSnackbarMsg("認証に失敗しました");
            setIsOpenErrorSnackbar(true);
            return;
        }

        setPartialLoadingFlag(true);
    }

    return {
        mailRef, nameRef, inquiryDetailsRef,
        turnstileRef,
        onSuccess, onSubmit,
        errorSnackbarMsg,
        isOpenErrorSnackbar, setIsOpenErrorSnackbar,
        partialLoadingFlag
    }

}
import { Paths } from "@/constants/common/paths";
import { useQueryContactInformations } from "@/hooks/reactQuery/contactInformations";
import { Breadcrumb } from "@/types/ui/breadcrumb";
import { SnackbarData } from "@/types/ui/snackbar/snackbarData";
import { FormEvent, useRef, useState } from "react";
export default function useContact() {

    const breadcrumbs: Breadcrumb[] = [
        {
            path: Paths.HOME,
            breadcrumb: "ホーム"
        },
        {
            path: Paths.CONTACT,
            breadcrumb: "利用規約"
        }
    ]

    //メールアドレス
    const mailRef = useRef<HTMLInputElement>(null);
    //お問い合わせ内容
    const inquiryDetailsRef = useRef<HTMLTextAreaElement>(null);

    //エラーメッセージ
    const [errorSnackbarMsg, setErrorSnackbarMsg] = useState<string>("入力されていない項目があります");
    const [isOpenErrorSnackbar, setIsOpenErrorSnackbar] = useState<boolean>(false);

    //ローディング
    const [isPartialLoadingOpen, setIsPartialLoadingOpen] = useState<boolean>(false);

    const turnstileRef = useRef<any>(null);
    const turnstileToken = useRef<string>("");

    const { submitContactInformations } = useQueryContactInformations();
    const contactInformationsWithArgs = submitContactInformations();

    const [snackbarData, setSnackbarData] = useState<SnackbarData>({
        state: "",
        message: "",
        time: 0,
        isOpen: false
    });

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

        if (!turnstileToken?.current) {
            setErrorSnackbarMsg("認証に失敗しました");
            setIsOpenErrorSnackbar(true);
            return;
        }

        setIsPartialLoadingOpen(true);

        const reviewData = {
            mail: mailRef.current?.value,
            inquiryDetails: inquiryDetailsRef.current?.value,
            token: turnstileToken.current
        }

        try {
            await contactInformationsWithArgs.mutateAsync(reviewData);
        } catch (error: any) {
            //認証再度実施
            turnstileRef.current?.reset();
            //トークン初期化
            if (turnstileToken?.current) {
                turnstileToken.current = "";
            }
            setIsPartialLoadingOpen(false);
            setSnackbarData({
                state: "error",
                message: "お問い合わせの送信に失敗しました",
                time: 5000,
                isOpen: true,
            });
            return;
        }

        setSnackbarData({
            state: "success",
            message: "お問い合わせの送信に成功しました",
            time: 5000,
            isOpen: true,
        })


        //認証再度実施
        turnstileRef.current?.reset();

        //フォーム、トークン初期化
        clearForm();

        setIsPartialLoadingOpen(false);
    }

    /**
     * フォーム初期化
     */
    const clearForm = () => {
        //メールアドレス初期化
        if (mailRef?.current?.value) {
            mailRef.current.value = "";
        }

        //お問い合わせ内容
        if (inquiryDetailsRef?.current?.value) {
            inquiryDetailsRef.current.value = "";
        }

        //トークン初期化
        if (turnstileToken?.current) {
            turnstileToken.current = "";
        }
    }

    const closeSuccessSnackbar = () => {
        setSnackbarData({
            state: "",
            message: "",
            time: 0,
            isOpen: false
        })
    }

    return {
        breadcrumbs,
        mailRef, inquiryDetailsRef,
        turnstileRef,
        onSuccess, onSubmit,
        errorSnackbarMsg,
        isOpenErrorSnackbar, setIsOpenErrorSnackbar,
        snackbarData,
        closeSuccessSnackbar,
        isPartialLoadingOpen
    }
}
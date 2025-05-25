"use client"
import { Paths } from "@/constants/common/paths";
import useLogin from "@/hooks/login/useLogin";
import supabase from "@/libs/supabase/supabaseClient";
import { Turnstile } from "@marsidev/react-turnstile";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { FormEvent } from "react";
import * as ja from "../../localization/ja/ja.json";
import Snackbar from "../snackbar";

//ログイン画面
export const Login = () => {

    const { snackbarData, isDisplayMailForm, mailRef, turnstileRef,
        onSubmit, onSuccess, showMagicLinkForm, closeSuccessSnackbar } = useLogin();
    return (

        <>
            <div className="w-96 mx-auto">
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={["google"]}
                    localization={{
                        variables: ja
                    }}
                    redirectTo={process.env.NEXT_PUBLIC_URL + Paths.AUTH_INIT}
                    onlyThirdPartyProviders
                    magicLink
                />

                {
                    isDisplayMailForm ? (
                        <form onSubmit={(e: FormEvent<HTMLFormElement>) => onSubmit(e)}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    メールアドレス
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    ref={mailRef}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {
                                process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
                                    <Turnstile
                                        ref={turnstileRef}
                                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                                        onSuccess={onSuccess}
                                    />
                                ) : (null)
                            }

                            <div className="ml-auto flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    確認コード送信
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex justify-center">
                            <button
                                className="hover:bg-gray-100 font-bold py-2 px-4 rounded inline-flex items-center"
                                onClick={() => showMagicLinkForm()}
                            >
                                Googleアカウントをお持ちでない方
                            </button>
                        </div>
                    )
                }
            </div>

            <Snackbar
                state={snackbarData.state}
                message={snackbarData.message}
                time={snackbarData.time}
                isOpen={snackbarData.isOpen}
                onClose={closeSuccessSnackbar}
            />
        </>
    );
}
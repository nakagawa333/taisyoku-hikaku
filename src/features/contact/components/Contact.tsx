"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import Snackbar from "@/components/snackbar";
import InfoErrorSnackbar from "@/components/snackbar/InfoErrorSnackbar";
import { Turnstile } from "@marsidev/react-turnstile";
import { FormEvent } from "react";
import useContact from "../hooks/useContact";

export default function Contact() {

    const {
        breadcrumbs,
        mailRef, inquiryDetailsRef,
        turnstileRef,
        onSuccess, onSubmit,
        errorSnackbarMsg,
        isOpenErrorSnackbar, setIsOpenErrorSnackbar,
        partialLoadingFlag,
        snackbarData,
        closeSuccessSnackbar
    } = useContact();

    return (
        <>

            <div className="p-4">
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                />
            </div>

            {
                isOpenErrorSnackbar ? (
                    <InfoErrorSnackbar
                        message={errorSnackbarMsg}
                        time={5000}
                        isOpen={isOpenErrorSnackbar}
                        setIsOpen={setIsOpenErrorSnackbar}
                    />
                ) : (null)
            }

            <Snackbar
                state={snackbarData.state}
                message={snackbarData.message}
                time={snackbarData.time}
                isOpen={snackbarData.isOpen}
                onClose={closeSuccessSnackbar}
            />


            <div className="bg-gray-100 min-h-screen w-full">
                <div className="flex justify-center w-full">
                    <div className="bg-white p-8 rounded-lg max-w-2xl mt-4 mb-2 w-full">
                        <h2 className="text-2xl font-bold mb-6 text-center">お問い合わせ</h2>

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

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    お問い合わせ内容
                                </label>

                                <textarea
                                    ref={inquiryDetailsRef}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                </textarea>
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
                                    送信
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
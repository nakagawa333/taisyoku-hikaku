import { Paths } from "@/constants/common/paths";
import Link from "next/link";
import { useState } from "react";

type Props = {
    isDisplay: boolean
    isLogin: boolean
}
//ハンバーガーメニュー
export default function HamburgerMenu(props: Props) {
    const { isLogin, isDisplay } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            {
                isDisplay ? (
                    <>
                        <div className="relative">
                            <div className="flex flex-col justify-around w-8 h-8 cursor-pointer" onClick={toggleMenu}>
                                <div className="w-full h-1 bg-gray-800"></div>
                                <div className="w-full h-1 bg-gray-800"></div>
                                <div className="w-full h-1 bg-gray-800"></div>
                            </div>
                        </div>

                        {
                            isOpen ? (
                                <div className="absolute top-full left-0 right-0 bg-white z-50 flex flex-col items-center justify-center">
                                    {
                                        isLogin ? (
                                            <Link
                                                href={Paths.LOGOUT}
                                                className="py-2"
                                            >
                                                ログアウト
                                            </Link>

                                        ) : (
                                            <Link
                                                href={Paths.LOGIN}
                                                className="py-2"
                                            >
                                                ログイン
                                            </Link>
                                        )
                                    }
                                    <Link href={Paths.TERMS_PRIVACY}>プライバシーポリシー</Link>
                                    <Link href={Paths.DISCLAIMER}>免責事項</Link>
                                    <a href="#" className="py-2">お問い合わせ</a>
                                </div>
                            )
                                : null}
                    </>
                ) : null}
        </>
    )
}
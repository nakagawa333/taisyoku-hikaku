"use client";
import { useMatchMedia } from "@/hooks/common/useMatchMedia";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isDisplay, setIsDisplay] = useState<boolean>(true);

    const mathMedia: boolean = useMatchMedia("(min-width: 1025px)");

    return (
        <>
            <header className="
               z-10 self-stretch bg-white flex flex-row items-start justify-start pt-5 pl-[68px] pr-[30px] 
                pb-[21px] sticky top-[0] text-left text-lg text-black333333 font-yugothic md:self-stretch md:bg-white-fff 
                md:flex md:flex-row md:items-start md:justify-start md:pt-5 md:px-[68px] md:pb-[21px] md:sticky md:top-[0] 
                md:text-left md:text-lg md:text-black333333 md:font-yugothic">

                <Image
                    src="/icon.png"
                    className="h-6 w-[34px] absolute !m-[0] top-[20px] left-[20px] object-contain"
                    alt=""
                    width={34}
                    height={15}
                />

                <Link
                    href={"/"}
                    className="[text-decoration:none] h-[27px] relative font-bold text-[inherit] inline-block"
                >
                    退職代行口コミランキング
                </Link>

            </header>
        </>
    )
}
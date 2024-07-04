import Link from "next/link";

export default function Header() {
    return (
        <>
            <header className="self-stretch bg-white flex flex-row items-start justify-start pt-5 px-[68px] pb-[21px] sticky top-[0] z-[99] text-left text-lg text-black333333 font-yugothic md:self-stretch md:bg-white-fff md:flex md:flex-row md:items-start md:justify-start md:pt-5 md:px-[68px] md:pb-[21px] md:sticky md:top-[0] md:z-[99] md:text-left md:text-lg md:text-black333333 md:font-yugothic">
                <img
                    src="/icon.png"
                    className="h-6 w-[34px] absolute !m-[0] top-[20px] left-[20px] object-contain"
                    alt=""
                >
                </img>
                <Link
                    href={"/"}
                    className="[text-decoration:none] h-[27px] relative font-bold text-[inherit] inline-block"
                >
                    退職代行比較.com
                </Link>
            </header>
        </>
    )
}
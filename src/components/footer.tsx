import { Paths } from "@/constants/common/paths";
import Link from "next/link";

export default function Footer() {

    return (
        <div
            className={`sticky top-full w-full self-stretch flex flex-col items-start justify-start max-w-full text-left text-sm text-black333333 font-yugothic`}
        >
            <footer
                className="bg-zinc-500 self-stretch bg-gyar-6a6a6a overflow-hidden flex flex-row items-start justify-start py-2.5 px-5 gap-[20px] text-left text-7xs-2 text-black font-inter">
                <div className="mx-auto flex flex-col items-start justify-start gap-[8px]">
                    <div className="flex flex-row items-start justify-start gap-[8px]">
                        <div className="mt-2 text-white relative text-3xs leading-[18.4px] font-medium font-yugothic text-white-fff inline-block min-w-[125px]">
                            🄫退職代行口コミランキング ALL rights reserved.
                        </div>
                    </div>
                    <div className="mx-auto text-white flex flex-row items-start justify-start gap-[40px] text-3xs text-white-fff font-yugothic">
                        <div className="relative font-medium inline-block min-w-[100px]">
                            <Link href={Paths.TERMS}>
                                利用規約
                            </Link>
                        </div>
                        <div className="relative font-medium inline-block min-w-[40px]">
                            <Link href={Paths.CONTACT}>
                                お問い合わせ
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
import { Paths } from "@/constants/common/paths";
import Link from "next/link";

export default function Footer() {

    return (
        <div
            className={`sticky top-full w-full self-stretch flex flex-col items-start justify-start max-w-full text-left text-sm text-black333333 font-yugothic`}
        >
            <footer
                className="bg-zinc-500 self-stretch bg-gyar-6a6a6a overflow-hidden flex flex-row items-start justify-start py-2.5 px-5 gap-[20px] text-left text-7xs-2 text-black font-inter">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                    <div className="flex flex-row items-start justify-start gap-[8px]">
                        <div className="bg-gainsboro box-border flex flex-row items-start justify-start pt-[5px] pb-1.5 pr-[3px] pl-1 border-[0.4px] border-solid border-black">
                            <div className="h-[19px] w-[19px] relative bg-gainsboro box-border hidden border-[0.4px] border-solid border-black" />
                            <div className="relative inline-block min-w-[11px] z-[1]">
                                ロゴ
                            </div>
                        </div>
                        <div className="mt-2 text-white relative text-3xs leading-[18.4px] font-medium font-yugothic text-white-fff inline-block min-w-[125px]">
                            退職代行比較検索.com
                        </div>

                    </div>
                    <div className="text-white flex flex-row items-start justify-start gap-[40px] text-3xs text-white-fff font-yugothic">
                        <div className="relative font-medium inline-block min-w-[100px]">
                            <Link href={Paths.TERMS_PRIVACY}>
                                プライバシーポリシー

                            </Link>
                        </div>
                        <div className="text-white relative font-medium inline-block min-w-[40px]">
                            <Link href={Paths.DISCLAIMER}>
                                免責事項
                            </Link>
                        </div>
                        <div className="relative font-medium inline-block min-w-[40px]">
                            お問合せ
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
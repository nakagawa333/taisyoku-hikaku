import { Paths } from "@/constants/common/paths";
import Link from "next/link";

export default function HeaderMenu() {
    return (
        <>
            <div className="flex justify-evenly">
                <Link href={Paths.TERMS_PRIVACY}>プライバシーポリシー</Link>
                <Link href={Paths.DISCLAIMER}>免責事項</Link>
                <Link href={Paths.CONTACT}>お問い合わせ</Link>
            </div>
        </>
    )
}

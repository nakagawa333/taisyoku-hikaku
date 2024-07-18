import { Paths } from "@/constants/common/paths";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    serviceId: string
}

//詳細情報ボタン
export default function DetailButton(props: Props) {
    const router = useRouter();
    const [style, setStyle] = useState({
        background: "#289CAC",
        color: "white",
        opacity: 1
    });
    const detailButtonClick = (serviceId: string) => {
        if (serviceId) {
            //ページ遷移
            router.push(`${Paths.SERVICE}/${serviceId}`);
        }
    }

    const detailButtonMouseEnter = () => {
        const copyStyle = JSON.parse(JSON.stringify(style));
        copyStyle.opacity = 0.8;
        setStyle(copyStyle);
    }

    const detailButtonMouseLeave = () => {
        const copyStyle = JSON.parse(JSON.stringify(style));
        copyStyle.opacity = 1;
        setStyle(copyStyle);
    }

    return (

        <div className="self-stretch bg-white-fff overflow-hidden flex flex-row items-start justify-start py-[30px] px-5">
            <button
                className="text-white cursor-pointer [border:none] py-4 px-5 bg-blue-289cac flex-1 flex flex-row items-start justify-center"
                style={{
                    background: style.background,
                    color: style.color,
                    opacity: style.opacity
                }}
                onClick={() => detailButtonClick(props.serviceId)}
                onMouseEnter={() => detailButtonMouseEnter()}
                onMouseLeave={() => detailButtonMouseLeave()}
            >
                <b className="relative text-lg inline-block font-yugothic text-left min-w-[72px]">
                    詳細情報を見る
                </b>
            </button>
        </div>
    )
}
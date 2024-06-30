import { Paths } from "@/constants/common/paths";
import { useRouter } from "next/navigation";

type Props = {
    serviceId:string
}

//詳細情報ボタン
export default function DetailButton(props:Props){
    const router = useRouter();

    const detailButtonClick = (serviceId:string) => {
        if(serviceId){
            //ページ遷移
            router.push(`${Paths.SERVICE}/${serviceId}`);
        }
    }

    return (

        <div className="self-stretch bg-white-fff overflow-hidden flex flex-row items-start justify-start py-[30px] px-5">
            <button 
                className="text-white cursor-pointer [border:none] py-4 px-5 bg-blue-289cac flex-1 flex flex-row items-start justify-center"
                style={{
                    background:"#289CAC",
                    color: "white"
                }}
                onClick={() => detailButtonClick(props.serviceId)}
            >
                <b className="relative text-lg inline-block font-yugothic text-left min-w-[72px]">
                    詳細情報を見る
                </b>
            </button>
      </div>
    )
}
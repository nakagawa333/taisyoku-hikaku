import { Paths } from "@/constants/common/paths";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import DetailButton from "./DetailButton";

type Props = {
    imgUrl: string,
    serviceId: string,
    serviceName: string
    tags: any[]
}

export default function Card({
    imgUrl,
    serviceId,
    serviceName,
    tags,
}: Props) {

    const router: AppRouterInstance = useRouter();

    /**
     * タグ名クリック時処理
     * @param tagName タグ名
     */
    const tagNameClick = (tagName: string) => {
        //ページ遷移
        router.push(`${Paths.TAGS}/${tagName}`);
    }

    return (
        <div
            className="rounded overflow-hidden shadow-lg max-w-xs mb-20"
            key={serviceId}
        >
            {
                imgUrl && (
                    <img
                        className="w-full"
                        src={imgUrl}
                        alt="image"
                    />
                )
            }
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                    {serviceName}
                </div>
                <p className="text-gray-700 text-base">

                </p>
            </div>

            <div className="px-6">
                {
                    Array.isArray(tags) && tags.map((tag: any) => {
                        return (
                            <span
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                onClick={() => tagNameClick(tag.tagName)}
                            >
                                #{tag.tagName}
                            </span>
                        )
                    })
                }
            </div>

            <DetailButton
                serviceId={serviceId}
            />
        </div>
    )
}
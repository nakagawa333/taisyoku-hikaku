import { Paths } from "@/constants/common/paths";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

type Props = {
    tagName: string
    count?: number
}

export const Tag = (props: Props) => {
    const { tagName, count } = props;
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
        <div className="flex">
            <span
                className="hover:bg-gray-50 px-1 py-1 text-sm text-gray-700 mr-1 mb-1"
                onClick={() => tagNameClick(tagName)}
            >
                #{tagName}

                {
                    count !== undefined && count !== null ? (
                        <span
                            className=""
                        >
                            ({count})
                        </span>
                    ) : (null)
                }
            </span>

        </div>
    )
}
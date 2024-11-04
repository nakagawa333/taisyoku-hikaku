import { Tag } from "@/components/tag";
import { TagsResponse } from "@/constants/api/response/serviceResponse";
import { Paths } from "@/constants/common/paths";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";


type Props = {
    tags: TagsResponse[] | null
}
//サービス詳細
export default function ServiceTags(props: Props) {
    const { tags } = props;
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
            {
                Array.isArray(tags) && tags.map((tag: TagsResponse, index: number) => {
                    return (
                        <Tag
                            key={index}
                            tagName={tag.tagName}
                            tagNameClick={tagNameClick}
                        >

                        </Tag>
                    )
                })
            }
        </div>
    )
}
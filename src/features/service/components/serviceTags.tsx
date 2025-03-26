import { Tag } from "@/components/tag";
import { TagsResponse } from "@/constants/api/response/serviceResponse";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";


type Props = {
    tags: TagsResponse[] | null
}
//サービス詳細
export default function ServiceTags(props: Props) {
    const { tags } = props;
    const router: AppRouterInstance = useRouter();

    return (
        <div className="flex">
            {
                Array.isArray(tags) && tags.map((tag: TagsResponse, index: number) => {
                    return (
                        <Tag
                            key={index}
                            tagName={tag.tagName}
                        />
                    )
                })
            }
        </div>
    )
}
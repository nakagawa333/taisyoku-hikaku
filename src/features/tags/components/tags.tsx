"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import ErrorSnackbar from "@/components/ErrorSnackbar";
import PartialLoading from "@/components/partialLoading";
import { Tag } from "@/components/tag";
import { Paths } from "@/constants/common/paths";
import { useTags } from "@/hooks/reactQuery/tags";
import { Breadcrumb } from "@/types/ui/breadcrumb";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

//タグ一覧画面
export const Tags = () => {
    const router: AppRouterInstance = useRouter();

    const [{ fetchTags }] = useTags();
    const resTags = fetchTags();
    const tagsData: any = resTags.data;
    const tagsIsLoading: boolean = resTags.isLoading;
    const tagsIsError: boolean = resTags.isError;
    const tagsIsFetchedAfterMount: boolean = resTags.isFetchedAfterMount;

    const breadcrumbs: Breadcrumb[] = [
        {
            path: "/",
            breadcrumb: "ホーム"
        },
        {
            path: "/tags",
            breadcrumb: "タグ"
        }
    ]
    const tagNameClick = (tagName: string) => {
        //ページ遷移
        router.push(`${Paths.TAGS}/${tagName}`);
    }

    if (tagsIsLoading || !tagsIsFetchedAfterMount) {
        return (
            <div className="min-h-screen">
                <PartialLoading isOpen={true} />
            </div>
        )
    }

    if (tagsIsError) {
        return (
            <div className="container m-auto min-h-screen">
                <ErrorSnackbar
                    message="エラーが発生しました"
                    time={5000}
                />
            </div>
        )
    }

    return (
        <>
            <div className="container m-auto min-h-screen">
                <div className="p-4">
                    <Breadcrumbs
                        breadcrumbs={breadcrumbs}
                    />
                </div>
                <div className="flex flex-wrap">
                    {Array.isArray(tagsData.tags) && tagsData.tags.map((tag: any, index: number) =>
                        <div className="" key={index}>
                            <Tag
                                tagName={tag.tagName}
                                count={tag.count}
                                tagNameClick={tagNameClick}
                            >

                            </Tag>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
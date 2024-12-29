import { Paths } from "@/constants/common/paths";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export default function useCard() {
    const router: AppRouterInstance = useRouter();

    /**
     * タグ名クリック時処理
     * @param tagName タグ名
     */
    const tagNameClick = (tagName: string) => {
        //ページ遷移
        router.push(`${Paths.TAGS}/${tagName}`);
    }

    /**
     * レビューボタンクリック
     */
    const reviewButtonClick = (serviceId: string) => {
        router.push(`${Paths.SERVICE}/${serviceId}`);
    }

    return {
        tagNameClick, reviewButtonClick
    }
}
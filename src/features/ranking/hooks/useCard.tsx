import { Paths } from "@/constants/common/paths";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export default function useCard() {
    const router: AppRouterInstance = useRouter();

    /**
     * サイトを見るボタンクリック時
     * @param url url
     */
    const viewSiteButtonClick = (url: string) => {
        window.open(url)
    }

    /**
     * レビューボタンクリック
     */
    const reviewButtonClick = (serviceId: string) => {
        router.push(`${Paths.SERVICE}/${serviceId}`);
    }

    return {
        reviewButtonClick,
        viewSiteButtonClick
    }
}
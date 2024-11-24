import { PostReviewType } from "@/types/ui/service/postPreview";
import { useContext } from "react";
import { PostReviewContext } from "../components/postReview";

export const useReviewContent = () => {
    const postReviewType: PostReviewType | null = useContext(PostReviewContext);

    if (!postReviewType) {
        return {
            goodPointChange: () => { },
            goodPointDetailChange: () => { },
            badPointChange: () => { },
            badPointDetailChange: () => { },
        }
    }

    //良い点最大文字数
    const goodPointMaxLength: number = 30;

    //良い点詳細
    const goodPointDetailMaxLength: number = 100;

    //悪い点最大文字数
    const badPointMaxLength: number = 30;

    //悪い点詳細
    const badPointDetailMaxLength: number = 100;

    /**
     * 良い点変更時
     * @param goodPoint 良い点
     */
    const goodPointChange = (goodPoint: string) => {
        postReviewType.setGoodPoint(goodPoint);
    }

    /**
     * 良い点詳細変更時
     * @param goodPointDetail 良い点詳細
     */
    const goodPointDetailChange = (goodPointDetail: string) => {
        postReviewType.setGoodPointDetail(goodPointDetail);
    }

    /**
     * 悪い変更時
     * @param badPoint 悪い点
     */
    const badPointChange = (badPoint: string) => {
        postReviewType.setbadPoint(badPoint);
    }

    /**
     * 悪い点詳細変更時
     * @param badPointDetail 悪い点詳細
     */
    const badPointDetailChange = (badPointDetail: string) => {
        postReviewType.setbadPointDetail(badPointDetail);
    }

    return {
        goodPointMaxLength, goodPointDetailMaxLength, badPointMaxLength, badPointDetailMaxLength,
        goodPointChange, goodPointDetailChange, badPointChange, badPointDetailChange
    }
}
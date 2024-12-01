import { PostReviewType } from "@/types/ui/service/postPreview";
import { useContext } from "react";
import { PostReviewContext } from "../components/postReview";

export const useReviewContent = () => {
    const postReviewType: PostReviewType | null = useContext(PostReviewContext);

    if (!postReviewType) {
        return {
            goodTitleChange: () => { },
            goodTitleDetailChange: () => { },
            concernTitleChange: () => { },
            concernTitleDetailChange: () => { },
        }
    }

    //良い点最大文字数
    const goodTitleMaxLength: number = 30;

    //良い点詳細
    const goodTitleDetailMaxLength: number = 100;

    //悪い点最大文字数
    const concernTitleMaxLength: number = 30;

    //悪い点詳細
    const concernTitleDetailMaxLength: number = 100;

    /**
     * 良い点変更時
     * @param goodTitle 良い点
     */
    const goodTitleChange = (goodTitle: string) => {
        postReviewType?.updateFormField("goodTitle", goodTitle);
    }

    /**
     * 良い点詳細変更時
     * @param goodTitleDetail 良い点詳細
     */
    const goodTitleDetailChange = (goodTitleDetail: string) => {
        postReviewType?.updateFormField("goodTitleDetail", goodTitleDetail);
    }

    /**
     * 悪い変更時
     * @param concernTitle 悪い点
     */
    const concernTitleChange = (concernTitle: string) => {
        postReviewType?.updateFormField("concernTitle", concernTitle);
    }

    /**
     * 悪い点詳細変更時
     * @param concernTitleDetail 悪い点詳細
     */
    const concernTitleDetailChange = (concernTitleDetail: string) => {
        postReviewType?.updateFormField("concernTitleDetail", concernTitleDetail);
    }

    return {
        goodTitleMaxLength, goodTitleDetailMaxLength, concernTitleMaxLength, concernTitleDetailMaxLength,
        goodTitleChange, goodTitleDetailChange, concernTitleChange, concernTitleDetailChange
    }
}
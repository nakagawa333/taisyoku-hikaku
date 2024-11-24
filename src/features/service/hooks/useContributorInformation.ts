import { PostReviewType } from "@/types/ui/service/postPreview";
import { Gender } from "@prisma/client";
import { useContext } from "react";
import { PostReviewContext } from "../components/postReview";

export default function useContributorInformation() {
    const postReviewType: PostReviewType | null = useContext(PostReviewContext);

    if (!postReviewType) {
        // Error handling: could throw or return default functions
        console.error("PostReviewContext is missing");
        return {
            ageChange: () => { },
            nickNameChange: () => { },
            genderChange: () => { }
        };
    }
    /**
     * ニックネーム入力時
     * @param nickName ニックネーム
     */
    const nickNameChange = (nickName: string) => {
        if (postReviewType) {
            postReviewType.setNickName(nickName);
        }
    }

    /**
     * 年代変更時
     * @param age 年代
     */
    const ageChange = (age: string) => {
        if (postReviewType) {
            postReviewType.setSelectAgeId(Number(age));
        }
    };

    /**
     * 性別変更時
     * @param gender 性別
     */
    const genderChange = (gender: Gender) => {
        if (postReviewType) {
            postReviewType.setGender(gender);
        }
    }

    return {
        ageChange, nickNameChange, genderChange
    }
}
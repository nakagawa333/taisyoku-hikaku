import { PostReviewType } from "@/types/ui/service/postPreview";
import { useContext } from "react";
import { useReviewContent } from "../hooks/useReviewContent";
import { PostReviewContext } from "./postReview";

//
export default function ReviewContent() {

    const postReviewType: PostReviewType | null = useContext(PostReviewContext);

    const {
        goodTitleMaxLength, goodTitleDetailMaxLength, concernTitleMaxLength, concernTitleDetailMaxLength,
        goodTitleChange, goodTitleDetailChange, concernTitleChange, concernTitleDetailChange
    } = useReviewContent();

    return (
        <div className="">
            <div className="mt-5">
                <p className="text-pink-300 text-sm">良い点</p>
                <input
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                    maxLength={goodTitleMaxLength}
                    required
                    value={postReviewType?.goodTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => goodTitleChange(e.target.value)}
                />

                <p className="mt-2 text-base">詳細</p>
                <textarea
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    maxLength={goodTitleDetailMaxLength}
                    value={postReviewType?.goodTitleDetail}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => goodTitleDetailChange(e.target.value)}

                ></textarea>
            </div>

            <div className="mt-5">
                <p className="text-sky-500 text-sm">悪い点</p>
                <input
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                    maxLength={concernTitleMaxLength}
                    required
                    value={postReviewType?.concernTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => concernTitleChange(e.target.value)}

                />

                <p className="mt-2 text-base">詳細</p>

                <textarea
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    maxLength={concernTitleDetailMaxLength}
                    value={postReviewType?.concernTitleDetail}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => concernTitleDetailChange(e.target.value)}

                ></textarea>
            </div>
        </div>

    )
}
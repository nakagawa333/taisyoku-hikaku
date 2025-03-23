import { PostReviewType } from "@/types/ui/service/postPreview";
import Image from 'next/image';
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
                <div className="flex pb-2">
                    <Image
                        width={20}
                        height={20}
                        className="rounded-full"
                        src="/good.svg"
                        alt=""
                    />
                    <p className="text-pink-300 text-sm pl-1">良い点</p>
                </div>

                <input
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                    maxLength={goodTitleMaxLength}
                    required
                    value={postReviewType?.reviewForm.goodTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => goodTitleChange(e.target.value)}
                />

                <p className="mt-2 text-base">詳細</p>
                <textarea
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    maxLength={goodTitleDetailMaxLength}
                    value={postReviewType?.reviewForm.goodTitleDetail}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => goodTitleDetailChange(e.target.value)}

                ></textarea>
            </div>

            <div className="mt-5">
                <div className="flex pb-2">
                    <Image
                        width={20}
                        height={20}
                        className="rounded-full"
                        src="/bad.svg"
                        alt=""
                    />
                    <p className="text-sky-500 text-sm pl-1">悪い点</p>
                </div>

                <input
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                    maxLength={concernTitleMaxLength}
                    required
                    value={postReviewType?.reviewForm.concernTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => concernTitleChange(e.target.value)}

                />

                <p className="mt-2 text-base">詳細</p>

                <textarea
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    maxLength={concernTitleDetailMaxLength}
                    value={postReviewType?.reviewForm.concernTitleDetail}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => concernTitleDetailChange(e.target.value)}

                ></textarea>
            </div>
        </div>

    )
}
import { ContributorInformationAgeOption } from "@/constants/ui/contributorInformation";
import { PostReviewType } from "@/types/ui/service/postPreview";
import { useContext } from "react";
import useContributorInformation from "../hooks/useContributorInformation";
import { PostReviewContext } from "./postReview";

//投稿者情報
export default function ContributorInformation() {
    //名前最大文字数
    const nickNameMaxLength: number = 30;

    const postReviewType: PostReviewType | null = useContext(PostReviewContext);

    const { ageChange, nickNameChange, genderChange } = useContributorInformation();
    return (
        <div className="mt-3 w-full bg-sky-100 shadow-md rounded-lg overflow-hidden">
            <div className="mt-3 mb-3 w-11/12 max-w-sm mx-auto">
                <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <p className="text-center pl-1">投稿者情報</p>

                </div>

                <div className="pt-1">
                    <p className="text-sm font-bold mb-1">ニックネーム</p>
                    <input
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                        value={postReviewType?.reviewForm.nickName}
                        onChange={(e: any) => nickNameChange(e.target.value)}
                        maxLength={nickNameMaxLength}
                        required
                    />
                </div>

                <div className="pt-1 mt-2">
                    <p className="text-sm border-gray-300 font-bold mb-1">年齢</p>
                    <select
                        className="border w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        onChange={(e) => ageChange(e.target.value)}
                    >
                        {
                            postReviewType?.options.map((option: ContributorInformationAgeOption) => {
                                return (
                                    <option key={option.id} value={option.id}>{option.age}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="pt-1 mt-2">
                    <p className="text-sm border-gray-300 font-bold mb-1">性別</p>

                    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="w-[90%] m-auto grid grid-cols-2 gap-4 items-center p-[5px]">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={postReviewType?.reviewForm.gender === "MEN"}
                                    onChange={() => genderChange("MEN")}
                                />
                                <label htmlFor="male">男性</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id="female"
                                    checked={postReviewType?.reviewForm.gender === "WOMEN"}
                                    onChange={() => genderChange("WOMEN")}

                                />
                                <label htmlFor="female">女性</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
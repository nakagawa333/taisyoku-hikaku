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
        <div className="mt-3 w-full bg-cyan-50 bg-white shadow-md rounded-lg overflow-hidden bg-sky-100">
            <div className="mt-3 mb-3 w-11/12 max-w-sm mx-auto">
                <p className="text-center">投稿者情報</p>

                <div className="pt-1">
                    <p className="text-sm font-bold">ニックネーム</p>
                    <input
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                        value={postReviewType?.reviewForm.nickName}
                        onChange={(e: any) => nickNameChange(e.target.value)}
                        maxLength={nickNameMaxLength}
                        required
                    />
                </div>

                <div className="pt-1">
                    <p className="text-sm border-gray-300 font-bold">年齢</p>
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

                <div className="pt-1">
                    <p className="font-bold">性別</p>

                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="grid grid-cols-2 gap-4 items-center">
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
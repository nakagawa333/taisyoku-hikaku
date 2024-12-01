
// export type PostReviewType = {
//     selectAgeId: number, //選択した年代ID
//     setSelectAgeId: Dispatch<SetStateAction<number>>,
//     options: ContributorInformationAgeOption[],
//     nickName: string, //ニックネーム
//     setNickName: Dispatch<SetStateAction<string>>,
//     gender: Gender, //性別
//     setGender: Dispatch<SetStateAction<Gender>>
//     goodTitle: string, //良い点
//     setgoodTitle: Dispatch<SetStateAction<string>>,
//     goodTitleDetail: string, //良い点詳細
//     setgoodTitleDetail: Dispatch<SetStateAction<string>>,
//     concernTitle: string, //悪い点
//     setconcernTitle: Dispatch<SetStateAction<string>>,
//     concernTitleDetail: string, //悪い点詳細
//     setconcernTitleDetail: Dispatch<SetStateAction<string>>
//     priceSatisfaction: number, //価格の満足度
//     setPriceSatisfaction: Dispatch<SetStateAction<number>>,
//     speedSatisfaction: number, //スピードの満足度
//     setSpeedSatisfaction: Dispatch<SetStateAction<number>>,
//     responseSatisfaction: number, //対応の満足度 
//     setResponseSatisfaction: Dispatch<SetStateAction<number>>,
//     costPerformanceSatisfaction: number, //コスパの満足度 
//     setCostPerformanceSatisfaction: Dispatch<SetStateAction<number>>
// }

import { ContributorInformationAgeOption } from "@/constants/ui/contributorInformation"
import { ReviewFormState } from "./reviewFormState"

export type PostReviewType = {
    options: ContributorInformationAgeOption[],
    reviewForm: ReviewFormState,
    // setReviewForm: Dispatch<ReviewFormState>
    updateFormField: <T extends keyof ReviewFormState>(field: T, value: ReviewFormState[T]) => void
}
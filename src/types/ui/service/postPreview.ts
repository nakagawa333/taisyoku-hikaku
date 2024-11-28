import { ContributorInformationAgeOption } from "@/constants/ui/contributorInformation"
import { Gender } from "@prisma/client"

export type PostReviewType = {
    selectAgeId: number, //選択した年代ID
    setSelectAgeId: React.Dispatch<React.SetStateAction<number>>,
    options: ContributorInformationAgeOption[],
    nickName: string, //ニックネーム
    setNickName: React.Dispatch<React.SetStateAction<string>>,
    gender: Gender, //性別
    setGender: React.Dispatch<React.SetStateAction<Gender>>
    goodTitle: string, //良い点
    setgoodTitle: React.Dispatch<React.SetStateAction<string>>,
    goodTitleDetail: string, //良い点詳細
    setgoodTitleDetail: React.Dispatch<React.SetStateAction<string>>,
    concernTitle: string, //悪い点
    setconcernTitle: React.Dispatch<React.SetStateAction<string>>,
    concernTitleDetail: string, //悪い点詳細
    setconcernTitleDetail: React.Dispatch<React.SetStateAction<string>>
    priceSatisfaction: number, //価格の満足度
    setPriceSatisfaction: React.Dispatch<React.SetStateAction<number>>,
    speedSatisfaction: number, //スピードの満足度
    setSpeedSatisfaction: React.Dispatch<React.SetStateAction<number>>,
    responseSatisfaction: number, //対応の満足度 
    setResponseSatisfaction: React.Dispatch<React.SetStateAction<number>>,
    costPerformanceSatisfaction: number, //コスパの満足度 
    setCostPerformanceSatisfaction: React.Dispatch<React.SetStateAction<number>>
}
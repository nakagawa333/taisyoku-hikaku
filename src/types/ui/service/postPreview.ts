import { ContributorInformationAgeOption } from "@/constants/ui/contributorInformation"
import { Gender } from "@prisma/client"

export type PostReviewType = {
    selectAgeId: number,
    setSelectAgeId: React.Dispatch<React.SetStateAction<number>>,
    options: ContributorInformationAgeOption[],
    nickName: string,
    setNickName: React.Dispatch<React.SetStateAction<string>>,
    gender: Gender,
    setGender: React.Dispatch<React.SetStateAction<Gender>>
    goodPoint: string,
    setGoodPoint: React.Dispatch<React.SetStateAction<string>>,
    goodPointDetail: string,
    setGoodPointDetail: React.Dispatch<React.SetStateAction<string>>,
    badPoint: string,
    setbadPoint: React.Dispatch<React.SetStateAction<string>>,
    badPointDetail: string,
    setbadPointDetail: React.Dispatch<React.SetStateAction<string>>
}
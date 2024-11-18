export type ContributorInformationAgeOption = {
    id: number
    age: string
}

//投稿者情報 年代
export const ContributorInformationAgeOptions = {
    lateTeens: {
        id: 1,
        age: "10代後半"
    },
    twentiy: {
        id: 2,
        age: "20代"
    },
    third: {
        id: 3,
        age: "30代"
    },
    four: {
        id: 4,
        age: "40代"
    },
    five: {
        id: 5,
        age: "50代"
    },
    beyond: {
        id: 6,
        age: "60代以降"
    }
} as const satisfies Record<string, ContributorInformationAgeOption>;
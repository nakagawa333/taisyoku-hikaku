import { ContributorInformationAgeOption, ContributorInformationAgeOptions } from "@/constants/ui/ContributorInformation"

//投稿者情報
export default function ContributorInformation() {

    const options = [
        ContributorInformationAgeOptions.lateTeens,
        ContributorInformationAgeOptions.twentiy,
        ContributorInformationAgeOptions.third,
        ContributorInformationAgeOptions.five,
        ContributorInformationAgeOptions.beyond
    ]

    return (
        <div className="mt-3 w-11/12 mx-auto">
            <p className="text-center">投稿者情報</p>

            <div className="pt-1">
                <p className="text-sm font-bold">ニックネーム</p>
                <input
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                />
            </div>

            <div className="pt-1 font-bold">
                <p className="text-sm border-gray-300">年齢</p>
                <select
                    className="border w-full rounded-lg"
                >
                    {
                        options.map((option: ContributorInformationAgeOption) => {
                            return (
                                <option key={option.id}>{option.age}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="pt-1 font-bold">
                <p className="">性別</p>
                <input
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                />
            </div>
        </div>
    )
}
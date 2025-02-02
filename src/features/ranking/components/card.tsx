import SpeechBubble from "@/components/bubble/speechBubble";
import { Tag } from "@/components/tag";
import StarRatings from "react-star-ratings";
import useCard from "../hooks/useCard";
import RankingIcon from "./rankingIcon";

type Props = {
    service: any,
    rank: number
}

export default function Card(props: Props) {
    const { rank, service } = props;

    const { tagNameClick, reviewButtonClick, viewSiteButtonClick } = useCard();

    return (
        <div
            className="m-auto rounded overflow-hidden shadow-lg max-w-xs md:max-w-3xl mb-20
                grid grid-cols-1 sm:grid-cols-3 gap-1s"
            key={service.serviceId}
        >

            <div className="sm:col-span-1">
                <div className="p-4 flex">

                    <RankingIcon
                        rank={rank}
                    />

                    <b
                        className="tracking-[0.04em] ml-3 mt-2">
                        {service.serviceName}
                    </b>
                </div>

                <div className="self-stretch h-[200px] flex flex-col items-start justify-start pt-0 px-0 pb-0 box-border gap-[10px]">
                    {
                        service.imgUrl && (
                            <img
                                className="transform self-stretch h-full w-full max-w-full overflow-hidden shrink-0"
                                alt="image"
                                src={service.imgUrl}
                            />
                        )
                    }
                </div>
            </div>

            <div className="w-full sm:col-span-2 md:max-w-full self-stretch bg-white-fff flex flex-col items-start justify-start py-6 px-5 gap-[5px]">

                <div className="flex">
                    <StarRatings
                        rating={service.comprehensiveEvaluationAvg}
                        numberOfStars={5}
                        name='rating'
                        starRatedColor="yellow"
                        starHoverColor="yellow"
                        ignoreInlineStyles={false}
                        starDimension="20px"
                        starSpacing="0px"
                    />
                    <p
                        className="pl-1.5 font-bold text-sm mt-0.5"
                        style={{ paddingTop: "3px" }}
                    >
                        {service.comprehensiveEvaluationAvg}
                    </p>

                    <div className="ml-3">
                        <SpeechBubble
                            count={service.reviewCount}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <p className="border-b-2">{service.goodTitle}</p>
                    <p className="border-b-2">{service.concernTitle}</p>
                </div>

                <div className="flex flex-wrap self-stretch text-xs tracking-[0.04em] leading-[170%] font-medium text-gyar-6a6a6a">

                    {
                        Array.isArray(service.serviceTags) && service.serviceTags.map((tag: any, index: number) => {
                            return (
                                <Tag
                                    key={index}
                                    tagName={tag.tagName}
                                    tagNameClick={tagNameClick}
                                />
                            )
                        })
                    }
                </div>

                <div className="flex justify-center w-full">
                    <button
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{
                            background: "#289CAC",
                            color: "white"
                        }}
                        onClick={() => viewSiteButtonClick(service.officialWebsite)}
                    >
                        サイトを見る
                    </button>

                    <button
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{
                            background: "#289CAC",
                            color: "white"
                        }}
                        onClick={() => reviewButtonClick(service.serviceId)}
                    >
                        口コミを見る
                    </button>
                </div>
            </div>
        </div>
    )
}
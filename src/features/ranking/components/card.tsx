import SpeechBubble from "@/components/bubble/speechBubble";
import OfficialWebsiteButton from "@/components/OfficialWebsiteButton";
import { Tag } from "@/components/tag";
import StarRatings from "react-star-ratings";
import useCard from "../hooks/useCard";

type Props = {
    service: any,
    rank: number
}

export default function Card(props: Props) {
    const { rank, service } = props;

    const { tagNameClick, reviewButtonClick } = useCard();

    return (
        <div
            className="m-auto rounded overflow-hidden shadow-lg max-w-xs mb-20"
            key={service.serviceId}
        >

            <div className="p-4 flex">
                <p>{rank}</p>
                <b className="tracking-[0.04em] ml-3">{service.serviceName}</b>
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

            <div className="w-80 self-stretch bg-white-fff flex flex-col items-start justify-start py-6 px-5 gap-[5px]">

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

                <div className="flex self-stretch text-xs tracking-[0.04em] leading-[170%] font-medium text-gyar-6a6a6a">

                    <OfficialWebsiteButton
                        url={service.officialWebsite}
                    />

                    <div className="self-stretch bg-white-fff overflow-hidden flex flex-row items-start justify-start py-[30px] px-5">
                        <button
                            className="text-white cursor-pointer [border:none] py-4 px-5 bg-blue-289cac flex-1 flex flex-row items-start justify-center"
                            style={{
                                background: "#289CAC",
                                color: "white"
                            }}
                            onClick={() => reviewButtonClick(service.serviceId)}
                        >
                            <b className="relative text-lg inline-block font-yugothic text-left min-w-[72px]">
                                口コミを見る
                            </b>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
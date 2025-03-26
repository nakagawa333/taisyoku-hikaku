import DetailButton from "./detailButton";
import { Tag } from "./tag";

type Props = {
    imgUrl: string,
    serviceId: string,
    serviceName: string
    tags: any[]
}

export default function Card(props: Props) {

    const { imgUrl, serviceId, serviceName, tags } = props;

    return (
        <div
            className="rounded overflow-hidden shadow-lg max-w-xs mb-20"
            key={serviceId}
        >
            <div className="self-stretch h-[200px] flex flex-col items-start justify-start pt-0 px-0 pb-0 box-border gap-[10px]">
                {
                    imgUrl && (
                        <img
                            className="transform hover:scale-125 self-stretch h-full w-full max-w-full overflow-hidden shrink-0"
                            alt="image"
                            src={imgUrl}
                        />
                    )
                }
            </div>
            <div className="w-80 self-stretch bg-white-fff flex flex-col items-start justify-start py-6 px-5 gap-[16px]">
                <b className="tracking-[0.04em]">{serviceName}</b>

                <div className="flex flex-wrap self-stretch text-xs tracking-[0.04em] leading-[170%] font-medium text-gyar-6a6a6a">

                    {
                        Array.isArray(tags) && tags.map((tag: any, index: number) => {
                            return (
                                <Tag
                                    key={index}
                                    tagName={tag.tagName}
                                />
                            )
                        })
                    }
                </div>
                <DetailButton
                    serviceId={serviceId}
                />
            </div>
        </div>
    )
}
import Image from 'next/image';

type Props = {
    rank: number
}

export default function RankingIcon(props: Props) {
    const { rank } = props;

    const src: string = rank <= 3 ? `/number${rank}.svg` : `/number4.svg`;
    return (
        <><div className="relative inline-block">
            <Image
                src={src}
                alt="ヘッダーイメージ"
                width={40}
                height={100}
                quality={100}
            />
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold shadow-lg">
                {rank}
            </p>
        </div>
        </>
    )
}
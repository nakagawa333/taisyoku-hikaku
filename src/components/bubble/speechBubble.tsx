type Props = {
    count: number
}

export default function SpeechBubble(props: Props) {
    const { count } = props;
    return (
        <div className={`flex mb-4`}>
            <div className="relative inline-block text-white px-4 py-2 rounded-md font-bold text-sm"
                style={{
                    background: "#289CAC",
                    color: "white"
                }}
            >
                {count}件
                <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-t-8 border-t-teal-500 border-l-4 border-l-transparent border-r-4 border-r-transparent"
                >
                </div>
            </div>
        </div>
    )
}
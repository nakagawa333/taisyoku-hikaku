
type Props = {
    url:string
}

export default function OfficialWebsiteButton(props:Props){
    const detailButtonClick = (url:string) => {
        window.open(url)
    }

    return (

        <div className="self-stretch bg-white-fff overflow-hidden flex flex-row items-start justify-start py-[30px] px-5">
            <button 
                className="text-white cursor-pointer [border:none] py-4 px-5 bg-blue-289cac flex-1 flex flex-row items-start justify-center"
                style={{
                    background:"#289CAC",
                    color: "white"
                }}
                onClick={() => detailButtonClick(props.url)}
            >
                <b className="relative text-lg inline-block font-yugothic text-left min-w-[72px]">
                    公式HP
                </b>
            </button>
      </div>
    )
}
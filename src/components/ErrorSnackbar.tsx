import { useEffect, useState } from "react"

type Props = {
    message:string
    time:number
}

//エラー用Snackbar
export default function ErrorSnackbar(props:Props){
    const [isOpen,setIsOpen] = useState<boolean>(true);

    const closeClick = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        let timer:NodeJS.Timeout;
        timer = setTimeout(() => {
            setIsOpen(false);
        },props.time);

        return (() => {
            clearTimeout(timer);
        })
    },[]);

    return (
        <>
           {
            isOpen ? (
                <div 
                  className="fixed top-0 inset-x-0 flex justify-center m-5"
                  style={{
                    zIndex:99999
                  }}
                >
                    <div className="w-9/12 h-12 flex bg-red-500 text-white text-sm rounded py-2 px-3 shadow-lg items-center justify-between">
                        <div>
                            <p>{props.message}</p>
                        </div>

                        <div className="ml-4">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="size-6"
                                onClick={() => closeClick()}
                            >
                                <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M6 18 18 6M6 6l12 12" 
                                />
                            </svg>
                        </div>
                    </div>
              </div>
            ): null}       
        </>
    )
}
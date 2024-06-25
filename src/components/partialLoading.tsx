import { useState } from "react";

type Props = {
    isOpen:boolean
}

export default function PartialLoading(props:Props){

    return (
        <>
          {
            props.isOpen ? (
                <div className="h-screen w-screen flex justify-center items-start">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                </div>
            ): null}
        </>
    )
}
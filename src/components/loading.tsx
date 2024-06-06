import { useState } from "react";

type Props = {
    isOpen:boolean
}

export default function Loading(props:Props){

    return (
        <>
          {
            props.isOpen ? (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                </div>
            ): null}
        </>
    )
}
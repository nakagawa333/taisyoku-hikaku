"use client"
import { useMatchMedia } from "@/hooks/common/useMatchMedia";
import Link from "next/link";

export default function Header(){

    const isMobileSize:boolean = useMatchMedia("(max-width: 599px)");
    const headerClass:string = isMobileSize ? "pb-16" : "";
    const divClass:string = isMobileSize ? "flex bg-gray-400 h-16 fixed w-full items-center" : "flex bg-gray-400 h-10 items-center"
    return(
        <>
        <header className={headerClass}>
            <div className={divClass}>
                {/* <img src="/test.png"></img> */}
                <Link 
                  href={"/"}
                  className="text-white text-2xl ml-5"  
                > 
                  退職代行比較.com
                </Link>

                {
                    isMobileSize ? (
                        <div className="ml-auto mr-5 mt-1">
                            <button id="hamburger-menu bg-black">
                                <span className={`bg-steel-800 block transition-all duration-300 ease-out 
                                                h-1 w-6 rounded-sm bg-black`} >
                                </span>
                                <span className={`bg-steel-800 block transition-all duration-300 ease-out 
                                                h-1 w-6 rounded-sm my-0.5 bg-black`} >
                                </span>
                                <span className={`bg-steel-800 block transition-all duration-300 ease-out 
                                                h-1 w-6 rounded-sm bg-black`} >
                                </span> 
                            </button>
                        </div>
                    ) : (
                        <></>
                    )
                }
            </div>
        </header>
        </>
    )
}
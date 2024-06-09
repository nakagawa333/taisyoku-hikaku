"use client"

import { useMatchMedia } from "@/hooks/common/useMatchMedia";

export default function Footer(){
    const isMobileSize:boolean = useMatchMedia("(max-width: 599px)");
    const headerClass:string = isMobileSize ? "flex flex-wrap bg-gray-400 h-16" : "flex flex-wrap bg-gray-400 h-10";
    
    return(
        <footer>
            <div className={headerClass}>
                <img src="/test.png"></img>
                <p className="text-white ml-5">退職代行比較.com</p>
                <p className="text-white ml-5">プライバシーポリシー</p>
                <p className="text-white ml-5">免責事項</p>
            </div>
        </footer>
    )
}
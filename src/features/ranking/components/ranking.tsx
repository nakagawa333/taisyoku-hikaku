"use client";

import TermsLists from "@/components/terms/termsLists";
import HeaderImage from "./headerImage";
import HeaderTitle from "./headerTitle";
import Rankingservices from "./rankingservices";


export default function Ranking() {

    return (
        <>

            <HeaderImage />
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 m-auto overflow-hidden max-w-xs md:max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-1s">
                    <div className="flex">
                        <HeaderTitle />
                    </div>
                    <div>

                    </div>
                </div>
                <div></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                    <Rankingservices
                    />
                </div>
                <div>
                    <div className="max-sm:p-4 max-sm:mt-6 w-96">
                        <TermsLists
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

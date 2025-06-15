"use client";

import TermsLists from "@/components/terms/termsLists";
import HeaderImage from "./headerImage";
import HeaderTitle from "./headerTitle";
import Rankingservices from "./rankingservices";

export default function Ranking() {

    return (
        <>
            <HeaderImage />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                <div className="sm:col-span-2">
                    <div className="m-auto max-w-xs md:max-w-3xl">
                        <HeaderTitle />
                    </div>
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

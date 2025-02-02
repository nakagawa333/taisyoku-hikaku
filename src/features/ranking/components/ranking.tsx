"use client";

import HeaderImage from "./headerImage";
import HeaderTitle from "./headerTitle";
import Rankingservices from "./rankingservices";
import TermsLists from "./termsLists";

export default function Ranking() {

    return (
        <>

            <HeaderImage />
            <HeaderTitle />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                    <Rankingservices
                    />
                </div>

                <div className="">
                    <TermsLists
                    />
                </div>
            </div>
        </>
    )
}

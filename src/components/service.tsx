"use client";

import { useService } from "@/hooks/reactQuery/service";
import Loading from "./loading";
import { useParams, usePathname, useSearchParams } from 'next/navigation'


export default function Page(){
    const pathname = usePathname();
    let pathnameSplit = pathname?.split("/");

    let id:string = "";
    if(pathnameSplit){
        id = pathnameSplit[pathnameSplit?.length - 1]; 
    }

    const [{fetchService}] = useService();
    const {data,isLoading,isError} = fetchService(id);
    
    return(
        <div className="container">
            {
                isLoading && !isError && (
                    <Loading 
                        isOpen={isLoading}
                    />
                )
            }

            <div className="flex flex-wrap">
                {
                    data?.service && (
                        <div className="">

                        </div>
                    )
                }
            </div>
        </div>
    )
}
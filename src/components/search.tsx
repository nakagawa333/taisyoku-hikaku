"use client"
import { Paths } from "@/constants/common/paths";
import validate from "@/utils/ui/validate/search";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search(){
    const router = useRouter();

    const [minPrice,setMinPrice] = useState("下限なし");
    const [maxPrice,setMaxPrice] = useState("上限なし");

    const minPrices:string[] = ["下限なし","15000","25000","30000","50000","100000"];
    const maxPrices:string[] = ["上限なし","15000","17000","25000","30000","50000","100000","500000","1000000"];

    const [errorPriceFlag,setErrorPriceFlag] = useState<boolean>(false);
    const [errorPriceMessage,setErrorPriceMessage] = useState<string>("");

    const minPricesChange = (e:any) => {
        let value = e.target.value;
        setMinPrice(value);
    }

    const maxPricesChange = (e:any) => {
        let value = e.target.value;
        setMaxPrice(value);
    }

    useEffect(() => {
        //バリデーションチェック
        if(minPrice !== "下限なし" && maxPrice !== "上限なし"){
            const errorFlag = validate(Number(minPrice),Number(maxPrice))
            if(errorFlag){
                setErrorPriceFlag(true);
                setErrorPriceMessage("料金の上限値は、下限値以上の値である必要があります");
                return;
            }
        }

        setErrorPriceFlag(false);
        setErrorPriceMessage("");
    },[minPrice,maxPrice])

    let managements = [
        {
            id:"33157715-b9fc-fdba-e0b2-d47080d0a9d9",
            value:"労働組合",
            checked:false,
            class:"w-[180px] !m-[0] absolute top-[0px] left-[0px] bg-white-fff flex flex-row items-start justify-start py-3 px-10 box-border gap-[12px]",
            childClass:"relative font-medium inline-block min-w-[64px]",
        },
        {
            id:"9B678BED-A786-BFE2-328C-ECC2335EE296",
            value:"民間企業",
            checked:false,
            class:"!m-[0] absolute top-[0px] left-[180px] bg-white-fff flex flex-row items-start justify-start py-3 pr-[31px] pl-10 gap-[10px]",
            childClass:"relative font-medium inline-block min-w-[84px]",
        },
        {
            id:"87da64dc-0ae8-bad4-45f5-fca1ea6c488d",
            value:"弁護士",
            checked:false,
            class:"w-[180px] !m-[0] absolute top-[48px] left-[0px] bg-white-fff flex flex-row items-start justify-start py-3 px-10 box-border gap-[12px]",
            childClass:"relative font-medium inline-block min-w-[64px]",
        },
    ];

    let contactInformations = [
        {
            id:"351D45D5-668F-AF33-B891-8B3BEB93D876",
            value:"電話",
            checked:false,
            class:"w-[180px] !m-[0] absolute top-[0px] left-[0px] bg-white-fff flex flex-row items-start justify-start py-3 px-10 box-border gap-[12px]",
            childClass:"relative font-medium inline-block min-w-[64px]"
        },
        {
            id:"11eaf0e5-10ac-7d1b-f4f3-a2870cfdc010",
            value:"LINE",
            checked:false,
            class:"!m-[0] absolute top-[0px] left-[180px] bg-white-fff flex flex-row items-start justify-start py-3 pr-[31px] pl-10 gap-[10px]",
            childClass:"relative font-medium inline-block min-w-[84px]"
        },
        {
            id:"1da14fc4-becd-88c3-68e4-a63015d3bc54",
            value:"メール",
            checked:false,
            class:"w-[180px] !m-[0] absolute top-[48px] left-[0px] bg-white-fff flex flex-row items-start justify-start py-3 px-10 box-border gap-[12px]",
            childClass:"relative font-medium inline-block min-w-[64px]"
        }
    ]

    let others = [
        {
            id:"freeConsultation", //無料相談
            value:"無料相談",
            checked:false,
            class:"w-[180px] !m-[0] absolute top-[0px] left-[0px] bg-white-fff flex flex-row items-start justify-start py-3 px-10 box-border gap-[12px]",
            childClass:"relative font-medium inline-block min-w-[64px]"
        },
        {
            id:"hourService", //24時間受付
            value:"24時間受付",
            checked:false,
            class:"!m-[0] absolute top-[0px] left-[180px] bg-white-fff flex flex-row items-start justify-start py-3 pr-[31px] pl-10 gap-[10px]",
            childClass:"relative font-medium inline-block min-w-[84px]"
        },
        {
            id:"guaranteeSystem", //送金保証
            value:"送金保証",
            checked:false,
            class:"w-[180px] !m-[0] absolute top-[48px] left-[0px] bg-white-fff flex flex-row items-start justify-start py-3 px-10 box-border gap-[12px]",
            childClass:"relative font-medium inline-block min-w-[64px]"
        },
    ];

    /**
     * 運営元チェックボックス変更時
     * @param e イベント
     * @param id id
     */
    const managementsChange = (e:any,id:string) => {
        const target = e.target;
        const checked = target.checked;
        managements = managements.map((management:any) => {
            if(management.id === id) management.checked = checked;
            return management;
        })
    }

    /**
     * 連絡方法チェックボックス変更時
     * @param e イベント
     * @param id id
     */
    const contactInformationChange = (e:any,id:string) => {
        const target = e.target;
        const checked = target.checked;
        contactInformations = contactInformations.map((contactInformation:any) => {
            if(contactInformation.id === id) contactInformation.checked = checked;
            return contactInformation;
        })
    }

    /**
     * その他チェックボックス変更時
     * @param e イベント
     * @param id id
     */
    const othersChange = (e:any,id:string) => {
        const target = e.target;
        const checked = target.checked;
        others = others.map((other:any) => {
            if(other.id === id) other.checked = checked;
            return other;
        })
    }

    /**
     * 検索ボタンクリック時
     * @param e イベント
     * @param id id
     */
    const searchClick = () => {
        //バリデーションチェック
        if(minPrice !== "下限なし" && maxPrice !== "上限なし"){
            const errorFlag = validate(Number(minPrice),Number(maxPrice))
            if(errorFlag){
                setErrorPriceFlag(true);
                setErrorPriceMessage("料金の上限値は、下限値以上の値である必要があります");
                return;
            }
        }

        const searchParams = new URLSearchParams();

        for(let management of managements){
            if(management.checked){
                let id = management.id;
                let params = searchParams.has("managements") !== false ? searchParams.get("managements") + ",": "";
                params += id;
                searchParams.set("managements",params);
            }
        }

        for(let contactInformation of contactInformations){
            if(contactInformation.checked){
                let id = contactInformation.id;
                let params = searchParams.has("contactInformations") !== false ? searchParams.get("contactInformations") + ",": "";
                params += id;
                searchParams.set("contactInformations",params);
            }
        }

        for(let other of others){
            if(other.checked){
                searchParams.set(other.id,other.checked?.toString());
            }
        }

        if(minPrice !== "下限なし"){
            searchParams.set("minPrice",minPrice);
        }

        if(maxPrice !== "上限なし"){
            searchParams.set("maxPrice",maxPrice);
        }

        router.push(`${Paths.SERVICES}?${searchParams}`);
    }

    return(
        <div
        className={`self-stretch flex flex-col items-start justify-start max-w-full text-left text-sm text-black333333 font-yugothic`}
      >
        <div className="self-stretch flex flex-col items-start justify-start">
            <p
                className="text-gray-600 w-full [border:none] [outline:none] bg-gray-ededed self-stretch h-[47px] overflow-hidden shrink-0 flex flex-row items-start justify-start py-2.5 px-6 box-border font-yugothic font-bold text-lg text-gyar-6a6a6a min-w-[216px]"
                style={{
                    background:"#EDEDED"
                }}
            >
                運営元
            </p>
            <div className="self-stretch h-[143px] flex flex-row flex-wrap items-center justify-center relative max-w-full text-base">
                {
                    managements.map((management:any,index:number) => {
                        return(
                            <div className={management.class} key={index}>
                                <input 
                                  className="m-0 h-[19.5px] w-[15px]" 
                                  type="checkbox" 
                                  onChange={(e) => managementsChange(e,management.id)}
                                  />
                                <div className={management.childClass}>
                                    {management.value}
                                </div>
                            </div>
                        )
                    }) 
                }
            </div>
            <section className="flex-1 flex flex-col items-start justify-start px-0 pb-0 box-border max-w-full">
                <img
                    className="self-stretch relative max-w-full overflow-hidden max-h-full object-cover"
                    loading="lazy"
                    alt=""
                    src="/frame.png"
                />
            </section>
          <p
            className="text-gray-600 w-full [border:none] [outline:none] bg-gray-ededed self-stretch h-[47px] overflow-hidden shrink-0 flex flex-row items-start justify-start py-2.5 px-6 box-border font-yugothic font-bold text-lg text-gyar-6a6a6a min-w-[216px]"
            style={{
                background:"#EDEDED"
            }}
          >
            料金
          </p>

          <div className="self-stretch bg-white-fff flex flex-col items-center justify-center py-5 px-[35px] z-[1] mt-[-3px]">
               {
                 errorPriceFlag ? (
                    <p className="font-medium p-4 mb-4 text-sm text-red-500" role="alert">
                        {errorPriceMessage}
                    </p>
                 ) : (null)
               }
               <div className="self-stretch overflow-x-auto flex flex-row items-center justify-start gap-[18px]">
                 <div className="w-full">
                     <select 
                         className={`border ${errorPriceFlag ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                         onChange={(e) => minPricesChange(e)}
                    >
                             {
                                 minPrices.map((minPrice:any,index:number) => {
                                     return (
                                         <option key={index}>{minPrice}</option>
                                     )
                                 })
                             }
                     </select>
                 </div>

                 <div className="relative font-medium text-black inline-block min-w-[14px] whitespace-nowrap">
                     ～
                 </div>

                 <div className="w-full">
                     <select 
                         className={`border ${errorPriceFlag ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                         onChange={(e) => maxPricesChange(e)}   

                         >
                             {
                                 maxPrices.map((minPrice:any,index:number) => {
                                     return (
                                         <option key={index}>{minPrice}</option>
                                     )
                                 })
                             }
                     </select>
                 </div>
               </div>
            </div>
        </div>

        <div className="self-stretch h-[143px] flex flex-row flex-wrap items-center justify-center relative max-w-full text-base">
          <img
            className="w-[360px] relative max-h-full hidden max-w-full z-[0]"
            alt=""
            src="/vector-11.svg"
          />
            <p
                className="text-gray-600 w-full [border:none] [outline:none] bg-gray-ededed self-stretch h-[47px] overflow-hidden shrink-0 flex flex-row items-start justify-start py-2.5 px-6 box-border font-yugothic font-bold text-lg text-gyar-6a6a6a min-w-[216px]"
                style={{
                    background:"#EDEDED"
                }}
            >
                連絡方法
            </p>
          <div className="h-24 w-full !m-[0] absolute top-[47px] left-[0px] bg-white-fff flex flex-row flex-wrap items-center justify-start">
            {
                contactInformations.map((contactInformation:any,index:number) => {
                    return (
                        <div className={contactInformation.class} key={index}>
                        <input 
                          className="m-0 h-[19.5px] w-[15px]" 
                          type="checkbox" 
                          onChange={(e) => contactInformationChange(e,contactInformation.id)}
                          />
                        <div className={contactInformation.childClass}>
                            {contactInformation.value}
                        </div>
                    </div>
                    )
                })
            }
          </div>
        </div>

        <div className="self-stretch h-[143px] flex flex-row flex-wrap items-center justify-center relative max-w-full text-base">
          <img
            className="w-[360px] relative max-h-full hidden max-w-full z-[0]"
            alt=""
            src="/vector-11.svg"
          />
            <p
                className="text-gray-600 w-full [border:none] [outline:none] bg-gray-ededed self-stretch h-[47px] overflow-hidden shrink-0 flex flex-row items-start justify-start py-2.5 px-6 box-border font-yugothic font-bold text-lg text-gyar-6a6a6a min-w-[216px]"
                style={{
                    background:"#EDEDED"
                }}
            >
                その他
            </p>
          <div className="h-24 w-full !m-[0] absolute top-[47px] left-[0px] bg-white-fff flex flex-row flex-wrap items-center justify-start">
            {
                others.map((other:any,index:number) => {
                    return (
                        <div className={other.class} key={index}>
                        <input 
                          className="m-0 h-[19.5px] w-[15px]" 
                          type="checkbox" 
                          onChange={(e) => othersChange(e,other.id)}
                          />
                        <div className={other.childClass}>
                            {other.value}
                        </div>
                    </div>
                    )
                })   
            }
          </div>
        </div>
        <div className="self-stretch bg-white-fff overflow-hidden flex flex-row items-start justify-start py-[30px] px-5">
          <button 
            className="text-white cursor-pointer [border:none] py-4 px-5 bg-blue-289cac flex-1 flex flex-row items-start justify-center"
            style={{
                background:"#289CAC",
                color: "white"
            }}
            onClick={() => searchClick()}
           >
            <b className="relative text-lg inline-block font-yugothic text-left min-w-[72px]">
              検索する
            </b>
          </button>
        </div>
      </div>
    )
}
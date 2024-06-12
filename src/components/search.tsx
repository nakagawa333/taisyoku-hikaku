"use client"
import { Paths } from "@/constants/common/paths";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search(){
    const router = useRouter();

    const [minPrice,setMinPrice] = useState("下限なし");
    const [maxPrice,setMaxPrice] = useState("上限なし");

    const minPrices:any[] = ["下限なし","15000","25000","30000","50000","100000"];
    const maxPrices:any[] = ["上限なし","15000","15000","25000","30000","50000","100000","500000","1000000"];

    const minPricesChange = (e:any) => {
        let value = e.target.value;
        setMinPrice(value);
    }

    const maxPricesChange = (e:any) => {
        let value = e.target.value;
        setMaxPrice(value);
    }

    let managements = [
        {
            id:"33157715-b9fc-fdba-e0b2-d47080d0a9d9",
            value:"労働組合",
            checked:false
        },
        {
            id:"9B678BED-A786-BFE2-328C-ECC2335EE296",
            value:"民間企業",
            checked:false
        },
        {
            id:"87da64dc-0ae8-bad4-45f5-fca1ea6c488d",
            value:"弁護士",
            checked:false
        },
    ];

    let contactInformations = [
        {
            id:"351D45D5-668F-AF33-B891-8B3BEB93D876",
            value:"電話",
            checked:false
        },
        {
            id:"11eaf0e5-10ac-7d1b-f4f3-a2870cfdc010",
            value:"LINE",
            checked:false
        },
        {
            id:"1da14fc4-becd-88c3-68e4-a63015d3bc54",
            value:"メール",
            checked:false
        }
    ]

    let others = [
        {
            id:"freeConsultation", //無料相談
            value:"無料相談",
            checked:false
        },
        {
            id:"hourService", //24時間受付
            value:"24時間受付",
            checked:false
        },
        {
            id:"guaranteeSystem", //送金保証
            value:"送金保証",
            checked:false
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
        <div className="container mx-auto">
          <div className="px-6 py-4 ">
            <p>退職代行会社を検索する</p>
          </div>
          <div className="">
            <div className="flex content-around mx-auto flex-wrap px-6 py-4">
                {
                    managements.map((management:any,index:number) => {
                        return(
                            <div className="flex items-center mb-4 w-1/3 p-2" key={index}>
                                <input 
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                    onChange={(e) => managementsChange(e,management.id)}
                                />
                                <label 
                                htmlFor="disabled-checkbox" 
                                className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                                    {management.value}
                                </label>
                          </div>
                        )
                    })
                }
            </div>

            <div className="">
              <div className="rounded-t-lg overflow-hidden flex items-center justify-around text-sm p-4">
                <div className="bg-gray-400 mr-3 py-2 px-4 rounded-full text-white">
                  基本料金目安
                </div>
              </div>
              <div className="px-6 py-4">
                <table className="table-auto">
                  <thead>
                  <tr className="border">
                    <th className="px-4 py-2 text-center">辞めると伝えるだけ</th>
                    <th className="px-4 py-2 text-center">会社と交渉したい</th>
                    <th className="px-4 py-2 text-center">訴訟に対応したい</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr className="border">
                      <td className="px-4 py-2 text-center">民間企業</td>
                      <td className="px-4 py-2 text-center">労働組合</td>
                      <td className="px-4 py-2 text-center">弁護士</td>
                    </tr>
                    <tr className="border">
                      <td className="px-4 py-2 text-center">1.5万-5万円</td>
                      <td className="px-4 py-2 text-center">2.5万-3万円</td>
                      <td className="px-4 py-2 text-center">5万-10万円</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="">
              <div className="px-6 py-4">
                <p>料金</p>
              </div>
              <div className="flex content-around mx-auto px-6 py-4">
                <div className="w-full">
                    <select 
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

                <div className="my-2 mx-5">
                    <p className="">～</p>

                </div>

                <div className="w-full">
                    <select 
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

            <div className="">
              <div className="px-6 py-4">
                <p>連絡方法</p>
              </div>
              <div className="flex content-around mx-auto flex-wrap px-6 py-4">
                {
                    contactInformations.map((contactInformation:any,index:number) => {
                       return (
                            <div className="flex items-center mb-4 w-1/3 p-2" key={index}>
                                <input 
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                    onChange={(e) => contactInformationChange(e,contactInformation.id)}
                                />
                                <label 
                                    htmlFor="disabled-checkbox" 
                                    className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                                    {contactInformation.value}
                                </label>
                            </div>                       
                       ) 
                    })
                }
              </div>
            </div>

            <div className="">
              <div className="px-6 py-4">
                <p>その他</p>
              </div>
              <div className="flex content-around mx-auto flex-wrap px-6 py-4">

                {
                    others.map((other:any,index:number) => {
                        return (
                            <div className="flex items-center mb-4 w-1/3 p-2" key={index}>
                                <input 
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                    onChange={(e) => othersChange(e,other.id)}
                                />
                                <label 
                                htmlFor="disabled-checkbox" 
                                className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                                    {other.value}
                                </label>
                          </div>                            
                        )
                    })
                }
              </div>
            </div>

            <div className="text-center">
              <button 
                type="button" 
                className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                onClick={() => searchClick()}
               >
                  検索する
              </button>

            </div>
          </div>
        </div>
    )
}
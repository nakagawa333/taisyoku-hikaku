"use client"

export default function Search(){

    const minPrices:any[] = ["下限なし","15000","25000","30000","50000","100000"];
    const maxPrices:any[] = ["上限なし","15000","15000","25000","30000","50000","100000","500000","1000000"];
    return(
        <div className="container mx-auto">
          <div className="px-6 py-4 ">
            <p>退職代行会社を検索する</p>
          </div>
          <div className="">
            <div className="flex content-around mx-auto flex-wrap px-6 py-4">
              <div className="flex items-center mb-4 w-1/3 p-2">
                <input 
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                />
                <label 
                  htmlFor="disabled-checkbox" 
                  className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                    労働組合
                </label>

              </div>
              <div className="flex items-center mb-4 w-1/3 p-2">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  
                />
                <label 
                  htmlFor="disabled-checkbox" 
                  className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                    民間企業
                </label>
              </div>
              <div className="flex items-center mb-4 w-1/3 p-2">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label 
                  htmlFor="disabled-checkbox" 
                  className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                    弁護士
                </label>
              </div>
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
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <p>連結方法</p>
              </div>
              <div className="flex content-around mx-auto flex-wrap px-6 py-4">
                <div className="flex items-center mb-4 w-1/3 p-2">
                  <input 
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                  />
                  <label 
                    htmlFor="disabled-checkbox" 
                    className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                      電話
                  </label>

                </div>
                <div className="flex items-center mb-4 w-1/3 p-2">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  
                  />
                  <label 
                    htmlFor="disabled-checkbox" 
                    className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                      LINE
                  </label>
                </div>
                <div className="flex items-center mb-4 w-1/3 p-2">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label 
                    htmlFor="disabled-checkbox" 
                    className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                      送金保証
                  </label>
                </div>
              </div>
            </div>

            <div className="">
              <div className="px-6 py-4">
                <p>その他</p>
              </div>
              <div className="flex content-around mx-auto flex-wrap px-6 py-4">
                <div className="flex items-center mb-4 w-1/3 p-2">
                  <input 
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                  />
                  <label 
                    htmlFor="disabled-checkbox" 
                    className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                      無料相談
                  </label>

                </div>
                <div className="flex items-center mb-4 w-1/3 p-2">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  
                  />
                  <label 
                    htmlFor="disabled-checkbox" 
                    className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                      24時間受付
                  </label>
                </div>
                <div className="flex items-center mb-4 w-1/3 p-2">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label 
                    htmlFor="disabled-checkbox" 
                    className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                      送金保証
                  </label>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                type="button" 
                className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                  検索する
              </button>

            </div>
          </div>
        </div>
    )
}
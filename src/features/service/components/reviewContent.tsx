export default function ReviewContent() {
    return (
        <div className="">
            <div className="mt-5">
                <p className="text-pink-300">良い点</p>
                <input
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                // maxLength={nameMaxLength}
                // required
                // value={postReviewData.name}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => postReviewInputOnChange(e, "name")}
                />

                <p className="mt-2">詳細</p>
                <textarea
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                ></textarea>
            </div>

            <div className="mt-5">
                <p className="text-sky-500">悪い点</p>
                <input
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                />

                <p className="mt-2">詳細</p>

                <textarea
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                ></textarea>
            </div>
        </div>

    )
}
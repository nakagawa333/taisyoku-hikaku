import CloseButton from "@/components/button/closeButton";
import { Dispatch, SetStateAction } from "react";

type Props = {
    openDeleteModal: boolean;
    setOpenDeleteModal: Dispatch<SetStateAction<boolean>>
    onConfirmDelete: () => void;
}

export default function ReviewDeleteConfirmModal(props: Props) {
    const { openDeleteModal, setOpenDeleteModal, onConfirmDelete } = props;

    return (
        <>
            {
                openDeleteModal ? (
                    <div
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-gray-500 bg-opacity-50 transition-transform duration-300 ease-in-out"
                    >
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                            <div className="flex">
                                <div className="">
                                    <p>口コミを削除しますか？</p>
                                </div>
                                <div className="ml-auto">
                                    <CloseButton
                                        closeButtonClick={() => setOpenDeleteModal(false)}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center gap-4">
                                <button
                                    className="bg-transparent bg-lime-400 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded"
                                    onClick={() => onConfirmDelete()}
                                >
                                    はい
                                </button>

                                <button
                                    className="bg-transparent bg-red-400 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                                    onClick={() => setOpenDeleteModal(false)}

                                >
                                    いいえ
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </>
    )
}
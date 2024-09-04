import { memo, useEffect } from "react";

type Props = {
    state: string
    message: string
    time: number
    isOpen: boolean
    onClose: () => void
}

//成功用Snackbar
function Snackbar(props: Props) {
    const { state, message, time, isOpen, onClose } = props;

    let color: string = "bg-red-500";

    if (state === "error") {
        color = "bg-red-500"
    } else if (state === "success") {
        color = "bg-teal-500";
    }

    useEffect(() => {
        if (isOpen) {
            let timer: NodeJS.Timeout;
            timer = setTimeout(() => {
                onClose()
            }, time);

            return (() => {
                clearTimeout(timer);
            })
        }

    }, [isOpen, time, onClose]);

    return (
        <>
            {
                isOpen ? (
                    <div
                        className="fixed top-0 inset-x-0 flex justify-center m-5"
                        style={{
                            zIndex: 99999
                        }}
                    >
                        <div className={`${color} w-9/12 h-12 flex text-white text-sm rounded py-2 px-3 shadow-lg items-center justify-between`}>
                            <div>
                                <p>{message}</p>
                            </div>

                            <div className="ml-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                    onClick={() => onClose()}
                                    aria-label="Close"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                ) : null}
        </>
    )
}

export default memo(Snackbar);

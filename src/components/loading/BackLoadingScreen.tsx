
type Props = {
    isOpen: boolean
}
export default function BackLoadingScreen(props: Props) {
    const { isOpen } = props;

    return (
        <>
            {
                isOpen ? (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-gray-200"
                        style={{
                            zIndex: 99999
                        }}
                    >
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                ) : null}
        </>
    )
}
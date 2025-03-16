import useTermsLists from "@/hooks/terms/useTermsLists";
import ErrorSnackbar from "../ErrorSnackbar";
import PartialLoading from "../partialLoading";
import TermsTags from "../termsTags/termsTags";

//条件一覧
export default function TermsLists() {
    const { resTags } = useTermsLists();

    if (resTags.isLoading || !resTags.isFetchedAfterMount) {
        return (
            <div className="min-h-screen">
                <PartialLoading isOpen={true} />
            </div>
        )
    }

    if (resTags.error) {
        return (
            <div className="container m-auto min-h-screen">
                <ErrorSnackbar
                    message="エラーが発生しました"
                    time={5000}
                />
            </div>
        )
    }

    return (
        <>
            <div className="flex mb-4 border-b-2 border-t-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" className="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
                <p className="ml-1 text-2xl font-bold">条件一覧</p>
            </div>

            {
                Array.isArray(resTags?.data?.tags) && (
                    <div className="ml-4">
                        <TermsTags
                            tags={resTags.data.tags}
                        />
                    </div>
                )
            }
        </>
    )
}
import ErrorSnackbar from "@/components/ErrorSnackbar";
import Heading from "@/components/heading";
import PartialLoading from "@/components/partialLoading";
import TermsTags from "@/components/termsTags/termsTags";
import useTermsLists from "../hooks/useTermsLists";

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
            <div className="p-4">
                <Heading
                    title="条件一覧"
                />
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
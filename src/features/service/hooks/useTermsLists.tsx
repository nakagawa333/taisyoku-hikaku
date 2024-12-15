import { uesTags } from "@/hooks/reactQuery/tags";

export default function usTeermsLists() {
    const [{ fetchTags }] = uesTags();
    const resTags = fetchTags();
    const tagsData: any = resTags.data;
    const tagsIsLoading: boolean = resTags.isLoading;
    const tagsIsError: boolean = resTags.isError;
    const tagsIsFetchedAfterMount: boolean = resTags.isFetchedAfterMount;
    return { resTags }
}
import { useTags } from "@/hooks/reactQuery/tags";

export default function useTermsLists() {
    const [{ fetchTags }] = useTags();
    const resTags = fetchTags();
    return { resTags }
}
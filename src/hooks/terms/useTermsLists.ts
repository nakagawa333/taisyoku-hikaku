import { useTags } from "../reactQuery/tags";

export default function useTermsLists() {
    const [{ fetchTags }] = useTags();
    const resTags = fetchTags();
    return { resTags }
}
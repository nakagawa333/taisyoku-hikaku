import Footer from "@/components/footer"
import Header from "@/components/headers/header"
import { Tags } from "@/features/tags/components/tags"

export default async function Page() {

    return (
        <>
            <Header />
            <Tags />
            <Footer />
        </>
    )
}
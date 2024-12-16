import Footer from "@/components/footer";
import Header from "@/components/header";
import Ranking from "@/features/ranking/components/ranking";

export default async function Page() {
    return (
        <>
            <Header />
            <Ranking />
            <Footer />
        </>
    )
}
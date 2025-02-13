import DisclaimerPage from "@/components/disclaimerPage/disclaimerPage";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default async function Page() {
    return (
        <>
            <Header />
            <DisclaimerPage />
            <Footer />
        </>
    )
}
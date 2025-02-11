import Footer from "@/components/footer";
import Header from "@/components/header";
import TermsPrivacy from "@/components/termsPrivacy/termsPrivacy";

export default async function Page() {
    return (
        <>
            <Header />
            <TermsPrivacy />
            <Footer />
        </>
    )
}
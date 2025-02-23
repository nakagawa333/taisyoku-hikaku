import Footer from "@/components/footer";
import Header from "@/components/headers/header";
import { Login } from "@/components/login/login";

export default async function Page() {
    return (
        <>
            <Header />
            <Login />
            <Footer />
        </>
    )
}
import Footer from "@/components/footer";
import Header from "@/components/headers/header";
import Services from "@/features/services/components/services";

export default async function Page() {
  return (
    <>
      <Header />
      <Services />
      <Footer />
    </>
  )
}
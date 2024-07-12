import Footer from "@/components/footer";
import Header from "@/components/header";
import { TagsOfServices } from "@/components/tags/tagName/tagsOfServices";

export default async function Page() {
  return (
    <>
      <Header />
      <TagsOfServices />
      <Footer />
    </>
  )
}
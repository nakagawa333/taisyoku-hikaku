import Footer from "@/components/footer";
import Header from "@/components/header";
import { TagsOfServices } from "@/features/tags/tagName/components/tagsOfServices";

export default async function Page() {
  return (
    <>
      <Header />
      <TagsOfServices />
      <Footer />
    </>
  )
}
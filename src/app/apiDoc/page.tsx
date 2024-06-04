import ReactSwagger from "@/components/reactSwagger";
import { getApiDocs } from "@/libs/swagger";


export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
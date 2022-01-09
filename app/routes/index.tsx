import { Link } from "remix";
import PageLayout from "~/components/PageLayout";

export default function Index() {
  return (
    <PageLayout>
      <h1 className="text-3xl mb-10">오호</h1>
      <section className="">
        <Link to="/posts">Post 보러가기</Link>
      </section>
    </PageLayout>
  );
}

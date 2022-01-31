import { Heading } from "@chakra-ui/react";
import { Link } from "remix";
import PageLayout from "~/components/PageLayout";

export default function Index() {
  return (
    <PageLayout>
      <Heading>오호</Heading>
      <section className="">
        <Link to="/posts">Post 보러가기</Link>
      </section>
    </PageLayout>
  );
}

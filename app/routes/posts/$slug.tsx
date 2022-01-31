import { LoaderFunction, useLoaderData } from "remix";
import styles from "prismjs/themes/prism-tomorrow.css";
import PageLayout from "~/components/PageLayout";
import db from "~/db/db.server";
import { Post } from "@prisma/client";
import { Heading } from "@chakra-ui/react";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    if (!params.slug) {
      throw new Error("No slug provided");
    }

    const post = await db.post.findFirst({
      where: { post_id: Number(params.slug) },
    });

    return post;
  } catch (e) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
};

const PostView = () => {
  const { title, content } = useLoaderData<Post>();

  return (
    <PageLayout>
      <Heading>{title}</Heading>
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </PageLayout>
  );
};

export default PostView;

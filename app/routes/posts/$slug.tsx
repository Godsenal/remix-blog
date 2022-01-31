import { LinksFunction, LoaderFunction, useLoaderData } from "remix";
import PageLayout from "~/components/PageLayout";
import db from "~/db/db.server";
import { Post } from "@prisma/client";
import { Heading } from "@chakra-ui/react";
import Editor from "~/components/Editor";
import { highlightCSS } from "~/utils/editor";

export const links: LinksFunction = () => [highlightCSS];

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
  console.log(title, content);

  return (
    <PageLayout>
      <Heading>{title}</Heading>
      {content && <Editor content={content} isViewer />}
    </PageLayout>
  );
};

export default PostView;

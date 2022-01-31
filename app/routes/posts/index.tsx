import { Post } from "@prisma/client";
import { LoaderFunction, useLoaderData } from "remix";
import ChakraLink from "~/components/ChakraLink";
import PageLayout from "~/components/PageLayout";
import PostList from "~/components/PostList";
import db from "~/db/db.server";

export const loader: LoaderFunction = async () => {
  const posts = await db.post.findMany({ take: 100 });

  return posts;
};

const Posts = () => {
  const posts = useLoaderData<Post[]>();

  return (
    <PageLayout>
      <ChakraLink to="/post/edit">글 작성</ChakraLink>
      <PostList posts={posts} />
    </PageLayout>
  );
};

export default Posts;

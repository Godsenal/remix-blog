import { LoaderFunction, useLoaderData } from "remix";
import PageLayout from "~/components/PageLayout";
import db from "~/db/db.server";
import { Post, User } from "@prisma/client";
import PostList from "~/components/PostList";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    if (!params.slug) {
      throw new Error("No slug provided");
    }

    const user = await db.user.findUnique({
      where: { user_id: Number(params.slug) },
      include: {
        posts: true,
      },
    });

    return user;
  } catch (e) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
};

const PostView = () => {
  const user = useLoaderData<User & { posts: Post[] }>();

  return (
    <PageLayout>
      <PostList posts={user.posts} />
    </PageLayout>
  );
};

export default PostView;

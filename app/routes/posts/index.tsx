import { Post } from "@prisma/client";
import { Link } from "@remix-run/react";
import { LoaderFunction, useLoaderData } from "remix";
import PageLayout from "~/components/PageLayout";
import db from "~/db/db.server";

export const loader: LoaderFunction = async () => {
  const posts = await db.post.findMany({ take: 100 });

  return posts;
};

const PostList = () => {
  const posts = useLoaderData<Post[]>();

  return (
    <PageLayout>
      <h1 className="text-3xl mb-10">Posts</h1>
      {posts.map(({ post_id, title, content }) => (
        <div key={post_id} className="mb-5">
          <Link to={`/posts/${post_id}`}>
            <h1 className="text-xl text-blue-400">{title}</h1>
          </Link>
          {content && <p>{content}</p>}
        </div>
      ))}
    </PageLayout>
  );
};

export default PostList;

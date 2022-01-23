import { Link } from "@remix-run/react";
import { LoaderFunction, useLoaderData } from "remix";
import PageLayout from "~/components/PageLayout";

export const loader: LoaderFunction = () => [];

const Post = () => {
  const posts = useLoaderData<any[]>();

  return (
    <PageLayout>
      <h1 className="text-3xl mb-10">Posts</h1>
      {posts.map(({ slug, title, excerpt }) => (
        <div key={slug} className="mb-5">
          <Link to={`/posts/${slug}`}>
            <h1 className="text-xl text-blue-400">{title}</h1>
          </Link>
          {excerpt && <p>{excerpt}</p>}
        </div>
      ))}
    </PageLayout>
  );
};

export default Post;

import { Link } from "react-router-dom";
import { LoaderFunction, useLoaderData } from "remix";
import { getPosts, TPost } from "~/loader/post";

export const loader: LoaderFunction = () => getPosts();

const Post = () => {
  const posts = useLoaderData<TPost[]>();

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(({ slug, title, excerpt }) => (
        <div key={slug}>
          <Link to={`/posts/${slug}`}>
            <h1>{title}</h1>
          </Link>
          {excerpt && <p>{excerpt}</p>}
        </div>
      ))}
    </div>
  );
};

export default Post;

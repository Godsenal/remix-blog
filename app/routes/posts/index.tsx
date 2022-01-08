import { Link } from "react-router-dom";
import { LoaderFunction, useLoaderData } from "remix";
import { getPosts, TPost } from "~/loader/post";

export const loader: LoaderFunction = () => getPosts();

const Post = () => {
  const posts = useLoaderData<Pick<TPost, "title">[]>();

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(({ title }) => (
        <Link key={title} to={`/posts/${title}`}>
          {title}
        </Link>
      ))}
    </div>
  );
};

export default Post;

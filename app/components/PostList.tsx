import { Post } from "@prisma/client";
import { Link } from "remix";

type TProps = { posts: Post[] };

const PostList = ({ posts }: TProps) => {
  return (
    <>
      <h1 className="text-3xl mb-10">Posts</h1>
      {posts.map(({ post_id, title, content }) => (
        <div key={post_id} className="mb-5">
          <Link to={`/posts/${post_id}`}>
            <h1 className="text-xl text-blue-400">{title}</h1>
          </Link>
          {content && <p>{content}</p>}
        </div>
      ))}
    </>
  );
};

export default PostList;

import { Heading } from "@chakra-ui/react";
import { Post } from "@prisma/client";
import { Link } from "remix";

type TProps = { posts: Post[] };

const PostList = ({ posts }: TProps) => {
  return (
    <>
      <Heading>Posts</Heading>
      {posts.map(({ post_id, title, content }) => (
        <div key={post_id} className="mb-5">
          <Link to={`/posts/${post_id}`}>
            <Heading size="lg">{title}</Heading>
          </Link>
          {content && <p>{content}</p>}
        </div>
      ))}
    </>
  );
};

export default PostList;

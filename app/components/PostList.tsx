import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { Post } from "@prisma/client";
import { Link } from "remix";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

type TProps = { posts: Post[] };

const PostList = ({ posts }: TProps) => {
  return (
    <Stack spacing={10}>
      {posts.map(({ post_id, title, excerpt, created_at }) => (
        <Box key={post_id}>
          <Link to={`/posts/${post_id}`}>
            <Stack spacing={5}>
              <Heading size="xl">{title}</Heading>
              {excerpt && <Text fontSize="lg">{excerpt}</Text>}
              <Text>
                {format(parseISO(created_at.toString()), "yyyy-MM-dd")}
              </Text>
            </Stack>
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

export default PostList;

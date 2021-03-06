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
          <Link to={`/posts/${post_id}`} prefetch="intent">
            <Stack
              spacing={3}
              sx={{
                "&:hover > h2": {
                  textDecoration: "underline",
                },
              }}
            >
              <Heading size="lg">{title}</Heading>
              <Text textStyle="caption" color="gray">
                {format(parseISO(created_at.toString()), "yyyy-MM-dd")}
              </Text>
              {excerpt && (
                <Text fontSize="lg" noOfLines={2}>
                  {excerpt}
                </Text>
              )}
            </Stack>
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

export default PostList;

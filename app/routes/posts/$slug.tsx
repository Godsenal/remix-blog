import {
  Form,
  LinksFunction,
  LoaderFunction,
  redirect,
  useLoaderData,
  useOutletContext,
  useParams,
} from "remix";
import PageLayout from "~/components/PageLayout";
import db from "~/db/db.server";
import { Post, User } from "@prisma/client";
import { Button, Heading, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import Editor from "~/components/Editor";
import { highlightCSS } from "~/utils/editor";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import ChakraLink from "~/components/ChakraLink";
import { TOutletContext } from "~/types/context";
import { getUserId } from "~/utils/auth.server";

export const links: LinksFunction = () => [highlightCSS];

export const action: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request);

  const result = await db.post.findUnique({
    where: { post_id: Number(params.slug) },
  });

  if (result?.author_id !== Number(userId)) {
    throw new Response("Forbidden", { status: 403 });
  }

  await db.post.delete({ where: { post_id: Number(params.slug) } });

  return redirect("/");
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    if (!params.slug) {
      throw new Error();
    }

    const post = await db.post.findUnique({
      where: { post_id: Number(params.slug) },
      include: { author: true },
    });

    if (!post) {
      throw new Error();
    }

    return post;
  } catch (e) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
};

const PostView = () => {
  const { user } = useOutletContext<TOutletContext>();
  const { slug } = useParams();
  const { title, content, author, created_at } = useLoaderData<
    Post & { author: User }
  >();
  const isMine = user?.user_id === author?.user_id;

  return (
    <PageLayout>
      <Stack>
        <Heading>{title}</Heading>
        <HStack>
          <HStack>
            <Text>{author.name || "temp"}</Text>
            <Text>·</Text>
            <Text>{format(parseISO(created_at.toString()), "yyyy-MM-dd")}</Text>
          </HStack>
          <Spacer />
          {isMine && (
            <>
              <ChakraLink to={`/posts/${slug}/edit`}>수정</ChakraLink>
              <Form method="post">
                <Button type="submit" variant="unstyled" color="red.400">
                  삭제
                </Button>
              </Form>
            </>
          )}
        </HStack>
        {content && <Editor content={content} isViewer />}
      </Stack>
    </PageLayout>
  );
};

export default PostView;

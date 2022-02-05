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
import {
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import Editor from "~/components/Editor";
import { highlightCSS } from "~/utils/editor";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import ChakraLink from "~/components/ChakraLink";
import { TOutletContext } from "~/types/context";
import { getUserId } from "~/utils/auth.server";
import { useRef } from "react";

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
  const alertState = useDisclosure();
  const $cancelButton = useRef<HTMLButtonElement>(null);
  const $deleteForm = useRef<HTMLFormElement>(null);
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
            <Text textStyle="caption" color="gray">
              {author.name || "temp"}
              {" · "}
              {format(parseISO(created_at.toString()), "yyyy-MM-dd")}{" "}
            </Text>
          </HStack>
          <Spacer />
          {isMine && (
            <>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<FiMoreVertical />}
                  bg="white"
                />
                <MenuList>
                  <MenuItem>
                    <ChakraLink to={`/posts/${slug}/edit`}>수정</ChakraLink>
                  </MenuItem>
                  <MenuItem onClick={alertState.onOpen}>삭제</MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </HStack>
        {content && <Editor content={content} isViewer />}
        <AlertDialog
          motionPreset="slideInBottom"
          {...alertState}
          leastDestructiveRef={$cancelButton}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>정말 삭제하시겠습니까?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogFooter>
              <Button ref={$cancelButton} onClick={alertState.onClose}>
                아니요
              </Button>
              <Form method="post" ref={$deleteForm}>
                <Button type="submit" colorScheme="red" ml={3}>
                  네
                </Button>
              </Form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Stack>
    </PageLayout>
  );
};

export default PostView;

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Post } from "@prisma/client";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
} from "remix";
import invariant from "tiny-invariant";
import PageLayout from "~/components/PageLayout";
import db from "~/db/db.server";
import { getUserId, requireUser } from "~/utils/auth.server";

type TPostInput = Pick<Post, "title" | "content">;
type TError = Record<keyof TPostInput, string>;

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserId(request);
  const formData = await request.formData();

  const errors = {} as Record<keyof TPostInput, string>;
  const title = formData.get("title");
  const content = formData.get("content");

  if (!title) {
    errors.title = "title is required";
  }
  if (!content) {
    errors.content = "content is required";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof content === "string");

  console.log(userId);

  const result = await db.post.create({
    data: { title, content, author_id: Number(userId) },
  });

  return redirect(`/posts/${result.post_id}`);
};

export const loader: LoaderFunction = async ({ request }) => {
  return await requireUser(request);
};

const PostEdit = () => {
  const errors = useActionData<TError>();

  return (
    <PageLayout>
      <Stack as={Form} method="post">
        <FormControl isInvalid={!!errors?.title}>
          <FormLabel htmlFor="title">제목</FormLabel>
          <Input id="title" name="title" />
          {errors?.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!errors?.content}>
          <FormLabel htmlFor="content">내용</FormLabel>
          <Textarea id="content" name="content" />
          {errors?.content && (
            <FormErrorMessage>{errors.content}</FormErrorMessage>
          )}
        </FormControl>
        <Button type="submit">완료</Button>
      </Stack>
    </PageLayout>
  );
};

export default PostEdit;

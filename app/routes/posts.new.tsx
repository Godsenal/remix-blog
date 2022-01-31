import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Post } from "@prisma/client";
import { useState } from "react";
import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  redirect,
  useFetcher,
} from "remix";
import invariant from "tiny-invariant";
import type { Editor as EditorType } from "@tiptap/core";
import Editor from "~/components/Editor";
import PageLayout from "~/components/PageLayout";
import db from "~/db/db.server";
import { getUserId, requireUser } from "~/utils/auth.server";
import { highlightCSS } from "~/utils/editor";

type TPostInput = Pick<Post, "title" | "content">;
type TError = Record<keyof TPostInput, string>;

export const links: LinksFunction = () => [highlightCSS];

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserId(request);
  const formData = await request.formData();

  const errors = {} as Record<keyof TPostInput, string>;
  const title = formData.get("title");
  const content = formData.get("content");
  const excerpt = formData.get("excerpt");

  if (!title) {
    errors.title = "title is required";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof content === "string");
  invariant(typeof excerpt === "string");

  const result = await db.post.create({
    data: { title, content, excerpt, author_id: Number(userId) },
  });

  return redirect(`/posts/${result.post_id}`);
};

export const loader: LoaderFunction = async ({ request }) => {
  return await requireUser(request);
};

const PostEdit = () => {
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState<EditorType>();
  const fetcher = useFetcher<TError>();
  const errors = fetcher.data;

  const handleSubmit = () => {
    if (!editor) {
      return;
    }

    fetcher.submit(
      {
        title,
        content: editor.getHTML() || "",
        excerpt: editor.getText().slice(0, 100) || "",
      },
      { method: "post" }
    );
  };

  return (
    <PageLayout withHeader={false}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors?.title}>
          <Input
            variant="unstyled"
            size="lg"
            id="title"
            name="title"
            placeholder="제목"
            fontSize="3xl"
            fontWeight="bold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors?.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
        </FormControl>
        <Editor setEditor={setEditor} />
        <Button type="submit" onClick={handleSubmit}>
          완료
        </Button>
      </Stack>
    </PageLayout>
  );
};

export default PostEdit;

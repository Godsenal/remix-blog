import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Post } from "@prisma/client";
import type { Editor as EditorType } from "@tiptap/core";
import { useState } from "react";
import { useFetcher } from "remix";
import Editor from "~/components/Editor";

type TPostInput = Pick<Post, "title" | "content" | "excerpt">;
type TError = Record<keyof TPostInput, string>;

type TProps = {
  originalPost?: Post;
};
const PostEditor = ({ originalPost }: TProps) => {
  const [title, setTitle] = useState(originalPost?.title || "");
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
      <Editor content={originalPost?.content || ""} setEditor={setEditor} />
      <Button type="submit" onClick={handleSubmit}>
        완료
      </Button>
    </Stack>
  );
};

export default PostEditor;

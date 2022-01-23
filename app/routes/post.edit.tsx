import { Post } from "@prisma/client";
import { ActionFunction, Form, redirect, useActionData } from "remix";
import invariant from "tiny-invariant";
import PageLayout from "~/components/PageLayout";
import db from "~/db/db.server";

type TPostInput = Pick<Post, "title" | "content">;
type TError = Record<keyof TPostInput, string>;

export const action: ActionFunction = async ({ request }) => {
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

  const result = await db.post.create({ data: { title, content } });

  return redirect(`/posts/${result.post_id}`);
};

const PostEdit = () => {
  const errors = useActionData<TError>();

  return (
    <PageLayout>
      <Form method="post" className="flex flex-col space-y-4">
        <div>
          <label htmlFor="title">제목</label>
          {errors?.title && (
            <em className="text-red-500 ml-2">{errors.title}</em>
          )}
        </div>
        <input id="title" name="title" className="border-2 rounded-md" />
        <div>
          <label htmlFor="content">내용</label>
          {errors?.content && (
            <em className="text-red-500 ml-2">{errors.content}</em>
          )}
        </div>
        <textarea id="content" name="content" className="border-2 rounded-md" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          완료
        </button>
      </Form>
    </PageLayout>
  );
};

export default PostEdit;

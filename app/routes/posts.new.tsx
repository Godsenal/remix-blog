import { ActionFunction, LinksFunction, LoaderFunction, redirect } from "remix";
import PageLayout from "~/components/PageLayout";
import db from "~/db/db.server";
import { getUserId, requireUser } from "~/utils/auth.server";
import { highlightCSS } from "~/utils/editor";
import { postScheme } from "~/utils/validate";
import PostEditor from "~/components/PostEditor";

export const links: LinksFunction = () => [highlightCSS];

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserId(request);
  const formData = await postScheme.validateForm(await request.formData());

  if (formData.errors) {
    return formData.errors;
  }

  const result = await db.post.create({
    data: { ...formData.data, author_id: Number(userId) },
  });

  return redirect(`/posts/${result.post_id}`);
};

export const loader: LoaderFunction = async ({ request }) => {
  return await requireUser(request);
};

const PostEdit = () => {
  return (
    <PageLayout withHeader={false}>
      <PostEditor />
    </PageLayout>
  );
};

export default PostEdit;

import { Post } from "@prisma/client";
import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import PageLayout from "~/components/PageLayout";
import db from "~/db/db.server";
import { getUserId, requireUser } from "~/utils/auth.server";
import { highlightCSS } from "~/utils/editor";
import { postScheme } from "~/utils/validate";
import PostEditor from "~/components/PostEditor";

export const links: LinksFunction = () => [highlightCSS];

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await getUserId(request);
  const formData = await postScheme.validateForm(await request.formData());

  if (formData.errors) {
    return formData.errors;
  }

  const result = await db.post.update({
    where: { post_id: Number(params.slug) },
    data: { ...formData.data, author_id: Number(userId) },
  });

  return redirect(`/posts/${result.post_id}`);
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUser(request);

  const post = await db.post.findUnique({
    where: { post_id: Number(params.slug) },
  });

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  if (post.author_id !== Number(userId)) {
    throw new Response("Forbidden", { status: 403 });
  }

  return post;
};

const PostEdit = () => {
  const originalPost = useLoaderData<Post>();

  return (
    <PageLayout withHeader={false}>
      <PostEditor originalPost={originalPost} />
    </PageLayout>
  );
};

export default PostEdit;

import { LoaderFunction, useLoaderData } from "remix";
import { getPost, TPost } from "~/loader/post";
import styles from "prismjs/themes/prism-tomorrow.css";
import PageLayout from "~/components/PageLayout";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    if (!params.slug) {
      throw new Error("No slug provided");
    }

    const post = await getPost(params.slug);

    return post;
  } catch (e) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
};

const Post = () => {
  const { title, content } = useLoaderData<TPost>();

  return (
    <PageLayout>
      <h1 className="text-3xl mb-10">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </PageLayout>
  );
};

export default Post;

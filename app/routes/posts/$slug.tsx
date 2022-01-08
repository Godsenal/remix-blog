import { LoaderFunction, useLoaderData } from "remix";
import { getPost, TPost } from "~/loader/post";

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
  const { title, body } = useLoaderData<TPost>();

  return (
    <div>
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};

export default Post;

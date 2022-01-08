import path from "path";
import fs from "fs/promises";

export type TPost = {
  title: string;
  body: string;
};

// netlify 서버 실행이 netlify/functions/server/build/index.js 에서 이루어짐.
// 해당 서버 기준으로 relative하게 path 생성
const postsPath = path.join(__dirname, "../../../..", "posts");

export async function getPost(title: string): Promise<TPost> {
  const file = await fs.readFile(path.join(postsPath, `${title}.md`), {
    encoding: "utf-8",
  });

  return { title, body: file };
}

export async function getPosts(): Promise<Pick<TPost, "title">[]> {
  const dir = await fs.readdir(postsPath);

  return Promise.all(
    dir.map(async (file) => {
      const title = file.replace(/\.md$/, "");

      return { title };
    })
  );
}

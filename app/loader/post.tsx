import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import removeMd from "remove-markdown";
import prism from "prismjs";

export type TPostMatter = {
  title: string;
  date: string;
  tags: string[];
  categories: string[];
  banner?: string;
};

export type TPost = {
  slug: string;
  excerpt?: string;
  content: string;
} & TPostMatter;

marked.setOptions({
  highlight: (code, lang) => {
    if (prism.languages[lang]) {
      return prism.highlight(code, prism.languages[lang], lang);
    } else {
      return code;
    }
  },
});

// netlify 서버 실행이 netlify/functions/server/build/index.js 에서 이루어짐.
// 해당 서버 기준으로 relative하게 path 생성
const postsPath = path.join(__dirname, "../../../..", "posts");

export async function readPost(slug: string): Promise<TPost> {
  const file = await fs.readFile(path.join(postsPath, `${slug}.md`));

  const { content, data, excerpt } = matter(file.toString(), {
    excerpt: true,
    excerpt_separator: "<!--more-->",
  });

  return { slug, content, excerpt, ...(data as TPostMatter) };
}

export async function getPost(slug: string): Promise<TPost> {
  const post = await readPost(slug);

  return {
    ...post,
    content: marked(post.content),
  };
}

export async function getPosts(): Promise<Omit<TPost, "content">[]> {
  const dir = await fs.readdir(postsPath);

  return Promise.all(
    dir.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const { content, ...others } = await readPost(slug);

      return {
        ...others,
        excerpt: removeMd(others.excerpt || ""),
      };
    })
  );
}

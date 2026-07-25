import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/insights");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  readTime: string;
  icon: string;
  content: string;
};

export function getPostSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory).filter((file) => file.endsWith(".md"));
}

export function getPostBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(contentDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || "",
    category: data.category || "Uncategorized",
    keywords: data.keywords || [],
    readTime: data.readTime || "5 min read",
    icon: data.icon || "Globe",
    content: content,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

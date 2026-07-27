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

  let formattedDate = "";
  if (data.date) {
    if (typeof data.date === "object" && typeof data.date.toISOString === "function") {
      formattedDate = data.date.toISOString().split("T")[0];
    } else if (Object.prototype.toString.call(data.date) === "[object Date]") {
      try {
        formattedDate = (data.date as Date).toISOString().split("T")[0];
      } catch {
        formattedDate = String(data.date);
      }
    } else {
      formattedDate = String(data.date);
    }
  }

  return {
    slug: String(realSlug),
    title: String(data.title || "Untitled"),
    description: String(data.description || ""),
    date: String(formattedDate),
    category: String(data.category || "Uncategorized"),
    keywords: Array.isArray(data.keywords) ? data.keywords.map((k) => String(k)) : [],
    readTime: String(data.readTime || "5 min read"),
    icon: String(data.icon || "Globe"),
    content: String(content || ""),
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

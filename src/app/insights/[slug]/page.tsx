import { Metadata } from "next";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    return {
      title: `${post.title} | Aurion Stack Insights`,
      description: post.description,
      keywords: post.keywords.join(", "),
    };
  } catch (error) {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  let post;
  try {
    const { slug } = await params;
    post = getPostBySlug(slug);
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/insights"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Insights
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 max-w-3xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl mb-6 text-balance">
            {post.title}
          </h1>
          
          <p className="text-base text-muted-foreground sm:text-lg text-balance max-w-2xl mx-auto">
            {post.description}
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Published on {post.date}</span>
            <span>·</span>
            <span>Aurion Stack Automated Engine</span>
          </div>
        </header>

        {/* Markdown Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

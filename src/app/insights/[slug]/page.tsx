import { Metadata } from "next";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Clock, ArrowRight, Sparkles, Copy, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import CodeBlock from "@/components/CodeBlock";

const BASE_URL = "https://www.aurionstack.dev";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  // Developer categories
  "AI & LLMs":       { bg: "bg-violet-500/10",  text: "text-violet-400",  border: "border-violet-500/30" },
  "Case Study":      { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  "Enterprise Dev":  { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/30" },
  "DevOps":          { bg: "bg-orange-500/10",  text: "text-orange-400",  border: "border-orange-500/30" },
  "Deployment":      { bg: "bg-cyan-500/10",    text: "text-cyan-400",    border: "border-cyan-500/30" },
  "Performance":     { bg: "bg-yellow-500/10",  text: "text-yellow-400",  border: "border-yellow-500/30" },
  "Mobile":          { bg: "bg-pink-500/10",    text: "text-pink-400",    border: "border-pink-500/30" },
  "SEO & GEO":       { bg: "bg-teal-500/10",    text: "text-teal-400",    border: "border-teal-500/30" },
  "Web Development": { bg: "bg-indigo-500/10",  text: "text-indigo-400",  border: "border-indigo-500/30" },
  // Business-owner categories (auto-generated posts)
  "Website Tips":    { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/30" },
  "Hiring Tips":     { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/30" },
  "AI for Business": { bg: "bg-violet-500/10",  text: "text-violet-400",  border: "border-violet-500/30" },
  "Marketing":       { bg: "bg-rose-500/10",    text: "text-rose-400",    border: "border-rose-500/30" },
  "SEO Basics":      { bg: "bg-teal-500/10",    text: "text-teal-400",    border: "border-teal-500/30" },
  "SaaS Explained":  { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  "default":         { bg: "bg-primary/10",      text: "text-primary",     border: "border-primary/30" },
};

const getCategoryStyle = (cat: string) => categoryColors[cat] ?? categoryColors["default"];

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
    const canonicalUrl = `${BASE_URL}/insights/${slug}`;

    return {
      title: post.title,
      description: post.description,
      keywords: post.keywords.join(", "),
      authors: [{ name: "Aurion Stack", url: BASE_URL }],
      alternates: { canonical: canonicalUrl },
      openGraph: {
        type: "article",
        url: canonicalUrl,
        title: post.title,
        description: post.description,
        siteName: "Aurion Stack",
        publishedTime: post.date,
        authors: ["Aurion Stack"],
        images: [{ url: "/aurionstack-logo.webp", width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: ["/aurionstack-logo.webp"],
        site: "@aurionstack",
        creator: "@aurionstack",
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  let post;
  try {
    const { slug } = await params;
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const canonicalUrl = `${BASE_URL}/insights/${post!.slug}`;
  const style = getCategoryStyle(post!.category);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": canonicalUrl,
    headline: post!.title,
    description: post!.description,
    url: canonicalUrl,
    datePublished: post!.date,
    dateModified: post!.date,
    keywords: post!.keywords.join(", "),
    image: { "@type": "ImageObject", url: `${BASE_URL}/aurionstack-logo.webp`, width: 1200, height: 630 },
    author: { "@type": "Organization", "@id": `${BASE_URL}/#organization`, name: "Aurion Stack", url: BASE_URL },
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    isPartOf: { "@type": "Blog", name: "Aurion Stack Insights", url: `${BASE_URL}/insights` },
    inLanguage: "en-US",
    articleBody: post!.content.slice(0, 500),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SchemaOrg schemas={[blogPostingSchema]} />

      {/* ── Sticky Topbar with proper Link navigation ── */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 max-w-4xl">
          {/* ← Back to Insights (deterministic, not history-based) */}
          <Link
            href="/insights"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-0.5 transition-transform">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to Insights
          </Link>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-foreground transition-colors">Insights</Link>
            <span>/</span>
            <span className={`font-medium ${style.text}`}>{post!.category}</span>
          </div>
        </div>
      </nav>

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden border-b border-border/40">
        {/* ambient gradient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
            style={{ background: "radial-gradient(ellipse, hsl(var(--primary)/0.15) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative container mx-auto px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 max-w-4xl">
          {/* Category + Read time */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest border ${style.bg} ${style.text} ${style.border}`}>
              {post!.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Clock size={12} />
              {post!.readTime}
            </span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{post!.date}</span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15] mb-5 text-balance">
            {post!.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8 text-balance">
            {post!.description}
          </p>

          {/* Meta footer */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Sparkles size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Aurion Stack</p>
                <p className="text-[10px] text-muted-foreground">Engineering Team</p>
              </div>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex flex-wrap gap-2">
              {post!.keywords.slice(0, 4).map(kw => (
                <span key={kw} className="rounded-md bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Article Body ── */}
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">

          {/* Main content */}
          <article
            className="
              prose prose-invert prose-base max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-muted-foreground prose-p:leading-[1.8]
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-primary prose-code:bg-primary/8 prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-muted/60 prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:shadow-lg
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:not-italic
              prose-blockquote:text-muted-foreground
              prose-table:border-collapse prose-th:bg-muted/50 prose-th:text-foreground prose-th:font-semibold
              prose-td:border-border prose-th:border-border
              prose-img:rounded-xl prose-img:shadow-md
              prose-li:text-muted-foreground prose-li:marker:text-primary
              prose-hr:border-border
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Code blocks → VS Code / terminal style
                code({ node, className, children, ...props }) {
                  const isBlock = Boolean(className);
                  const language = (className || "").replace("language-", ") || "plaintext";
                  if (!isBlock) {
                    // Inline code
                    return (
                      <code
                        className="rounded-md bg-violet-500/10 border border-violet-500/20 px-1.5 py-0.5 text-[0.82em] font-mono text-violet-300 before:content-none after:content-none"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <CodeBlock language={language}>
                      {String(children).replace(/\n$/, "")}
                    </CodeBlock>
                  );
                },
                // Blockquotes → tip boxes
                blockquote({ children }) {
                  return (
                    <div className="my-6 flex gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-5 py-4">
                      <span className="mt-0.5 text-cyan-400 text-base">💡</span>
                      <div className="text-sm text-muted-foreground leading-relaxed [&>p]:m-0">{children}</div>
                    </div>
                  );
                },
                // Tables
                table({ children }) {
                  return (
                    <div className="my-6 overflow-x-auto rounded-xl border border-border">
                      <table className="w-full text-sm">{children}</table>
                    </div>
                  );
                },
                th({ children }) {
                  return <th className="bg-muted/60 px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-foreground border-b border-border">{children}</th>;
                },
                td({ children }) {
                  return <td className="px-4 py-3 text-sm text-muted-foreground border-b border-border/50">{children}</td>;
                },
                // Headings
                h2({ children }) {
                  return <h2 className="mt-12 mb-4 text-xl sm:text-2xl font-bold tracking-tight text-foreground border-b border-border pb-2">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="mt-8 mb-3 text-lg font-bold text-foreground">{children}</h3>;
                },
              }}
            >
              {post!.content}
            </ReactMarkdown>
          </article>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              {/* About Aurion Stack */}
              <div className={`rounded-xl border ${style.border} ${style.bg} p-4`}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${style.text}`}>
                  Written By
                </p>
                <p className="text-sm font-semibold text-foreground mb-1">Aurion Stack</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We build AI systems, SaaS MVPs, and automation workflows for global businesses.
                </p>
                <Link
                  href="/"
                  className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${style.text} hover:underline`}
                >
                  See our work <ArrowRight size={11} />
                </Link>
              </div>

              {/* Tags */}
              <div className="rounded-xl border border-border bg-card/30 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Topics
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post!.keywords.map(kw => (
                    <span key={kw} className="rounded-md bg-muted/60 px-2 py-1 text-[10px] font-medium text-muted-foreground">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-4 text-center">
                <p className="text-xs font-bold text-foreground mb-2">Build With Us</p>
                <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
                  Apply these ideas to your product.
                </p>
                <Link
                  href="mailto:aurionstack@gmail.com"
                  className="block w-full rounded-lg bg-foreground py-2 text-xs font-semibold text-background hover:bg-foreground/90 transition-colors"
                >
                  Book a Free Call
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Back / Forward nav ── */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/insights"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-0.5 transition-transform">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            All Insights
          </Link>

          <Link
            href="mailto:aurionstack@gmail.com"
            className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/8 px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/15 transition-colors"
          >
            <Sparkles size={14} />
            Work with Aurion Stack
          </Link>
        </div>
      </div>
    </div>
  );
}

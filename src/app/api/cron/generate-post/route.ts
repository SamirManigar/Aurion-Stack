import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import OpenAI from 'openai';

export const maxDuration = 60;

// ─── Topic pool: written for business owners, not developers ───────────────
// Reader: a small business owner, local entrepreneur, or founder who wants
// to build an online presence, hire a developer, or use AI to grow.
// Every topic naturally leads to Aurion Stack's services.
const TOPIC_POOL = [
  // Building Online Presence
  { title: "How Much Does It Really Cost to Build a Professional Business Website in 2026?", category: "Website Tips", icon: "Globe", keywords: ["website cost 2026", "how much does a website cost", "hire web developer price", "professional website cost"] },
  { title: "7 Signs Your Business Needs a New Website (And Customers Are Noticing)", category: "Website Tips", icon: "Globe", keywords: ["signs you need a new website", "outdated business website", "website redesign", "losing customers website"] },
  { title: "What to Look for When Hiring a Web Development Agency (Non-Technical Guide)", category: "Hiring Tips", icon: "BarChart3", keywords: ["how to hire web developer", "choosing web agency", "web development agency guide", "hire web developer tips"] },
  { title: "The 5 Questions You Must Ask Before Hiring Any Web Developer or Agency", category: "Hiring Tips", icon: "BarChart3", keywords: ["questions to ask web developer", "hiring web agency checklist", "web developer red flags", "find web developer"] },
  { title: "Why Your Local Business Is Losing Customers to Competitors With Better Websites", category: "Website Tips", icon: "Globe", keywords: ["local business website", "beat competitors online", "small business website importance", "get more customers online"] },
  { title: "The Honest Truth: DIY Website Builders vs Hiring a Professional Agency", category: "Website Tips", icon: "Globe", keywords: ["Wix vs professional website", "DIY website vs agency", "website builder vs developer", "Squarespace vs custom website"] },
  { title: "How Long Does It Take to Build a Business Website? (A Realistic Timeline)", category: "Website Tips", icon: "Globe", keywords: ["website build timeline", "how long to build website", "web development timeline", "website delivery time"] },
  // AI for Business Owners
  { title: "What Is an AI Chatbot and How Can It Help Your Business Make More Money?", category: "AI for Business", icon: "Brain", keywords: ["AI chatbot for business", "chatbot for small business", "how AI chatbot works", "AI customer service"] },
  { title: "How Businesses Are Using AI to Answer Customer Questions 24/7 (Without Extra Staff)", category: "AI for Business", icon: "Brain", keywords: ["24/7 customer support AI", "AI for small business", "automate customer service", "AI receptionist"] },
  { title: "Is AI Right for Your Business? A Simple Guide for Non-Tech Business Owners", category: "AI for Business", icon: "Brain", keywords: ["AI for non-technical business owners", "should my business use AI", "AI tools for small business", "beginner AI business guide"] },
  { title: "5 Ways a Small Business Can Use AI to Compete With Big Companies", category: "AI for Business", icon: "Brain", keywords: ["AI for small business competition", "compete with big companies AI", "AI advantage small business", "business AI tools 2026"] },
  { title: "How AI Can Automatically Book Appointments for Your Business While You Sleep", category: "AI for Business", icon: "Smartphone", keywords: ["AI appointment booking", "automate booking system", "online booking AI", "AI scheduler business"] },
  { title: "What Is a Lead Magnet and How Can AI Help You Get More Customers Online?", category: "Marketing", icon: "Zap", keywords: ["lead magnet business", "get more customers online", "AI lead generation", "online lead capture"] },
  // Online Presence & Marketing
  { title: "Why Google Can't Find Your Business (And How to Fix It This Week)", category: "SEO Basics", icon: "Globe", keywords: ["google can't find my business", "why my website doesn't show on google", "local SEO basics", "get found on google"] },
  { title: "The Simple Guide to Getting Your Business on the First Page of Google", category: "SEO Basics", icon: "Globe", keywords: ["how to rank on google", "first page google small business", "local SEO guide", "rank higher google"] },
  { title: "Why Every Tradesperson Needs a Professional Website in 2026", category: "Website Tips", icon: "Globe", keywords: ["tradesperson website", "plumber website", "electrician website design", "local tradesman website 2026"] },
  { title: "How to Use WhatsApp to Automatically Follow Up With Your Leads (No Tech Skills Needed)", category: "AI for Business", icon: "Smartphone", keywords: ["WhatsApp business automation", "WhatsApp follow up leads", "automate WhatsApp", "WhatsApp for small business"] },
  { title: "What Is a SaaS Product and How Can Your Business Idea Become One?", category: "SaaS Explained", icon: "Zap", keywords: ["what is SaaS", "SaaS explained simply", "turn business idea into software", "build a SaaS product"] },
  { title: "How Restaurants and Cafes Are Using AI to Get More Online Orders", category: "AI for Business", icon: "Brain", keywords: ["AI for restaurants", "restaurant online orders", "AI chatbot restaurant", "food business AI"] },
  { title: "Should You Build an App or a Website? A Business Owner's Guide", category: "Website Tips", icon: "Smartphone", keywords: ["app vs website for business", "should I build an app", "mobile app vs website", "business app development"] },
  { title: "How Real Estate Agents Are Using AI Websites to Get 3x More Enquiries", category: "AI for Business", icon: "Brain", keywords: ["real estate AI website", "real estate agent AI", "property website AI", "AI for real estate business"] },
  { title: "The Biggest Website Mistakes That Are Costing Your Business Sales Every Day", category: "Website Tips", icon: "Globe", keywords: ["website mistakes costing sales", "fix website to get more sales", "website errors losing customers", "improve website conversions"] },
  { title: "How to Tell If Your Website Is Actually Bringing In Customers (Or Just Sitting There)", category: "Website Tips", icon: "BarChart3", keywords: ["website performance check", "is my website working", "website analytics for business owners", "track website customers"] },
  { title: "E-Commerce vs a Simple Business Website: Which One Does Your Business Actually Need?", category: "Website Tips", icon: "Globe", keywords: ["ecommerce vs website", "do I need online store", "ecommerce for small business", "business website types"] },
  { title: "How to Get More 5-Star Reviews for Your Business Using Automation", category: "AI for Business", icon: "Zap", keywords: ["get more google reviews", "automate review requests", "5-star reviews business", "review automation"] },
];

function pickTopic(existingTitles: string[]) {
  const available = TOPIC_POOL.filter(t =>
    !existingTitles.some(existing =>
      existing.toLowerCase().includes(t.title.split(' ').slice(0, 5).join(' ').toLowerCase())
    )
  );
  if (available.length === 0) return TOPIC_POOL[Math.floor(Math.random() * TOPIC_POOL.length)];
  return available[Math.floor(Math.random() * available.length)];
}

// ─── Route Handler ─────────────────────────────────────────────────────────
export async function GET(request: Request) {
  try {
    // 1. Auth check
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!process.env.GITHUB_PAT || !process.env.GROQ_API_KEY) {
      return new NextResponse('Missing required API keys', { status: 500 });
    }


    // 2. Get existing post titles to avoid duplicates
    const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
    const owner = process.env.GITHUB_OWNER || 'SamirManigar';
    const repo = process.env.GITHUB_REPO || 'Aurion-Stack';
    const branch = 'main';

    let existingTitles: string[] = [];
    try {
      const { data: existingFiles } = await octokit.repos.getContent({
        owner,
        repo,
        path: 'src/content/insights',
      });
      if (Array.isArray(existingFiles)) {
        existingTitles = existingFiles.map(f => f.name.replace('.md', '').replace(/-/g, ' '));
      }
    } catch {
      // Directory may not exist yet — that's fine
    }

    // 3. Pick a fresh topic
    const topic = pickTopic(existingTitles);
    const today = new Date().toISOString().split('T')[0];

    // 4. Generate article with Groq (llama-3.3-70b — fast, accurate, free tier)
    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    });

    const systemPrompt = `You are a friendly, knowledgeable business advisor writing for Aurion Stack — a professional web development and AI automation agency.

YOUR READER is a non-technical business owner. They might be:
- A local shop owner, tradesperson, restaurant owner, or professional (accountant, lawyer, consultant)
- A small business founder who wants to build an online presence for the first time
- An entrepreneur researching whether to hire a web developer or agency
- Someone who already has a basic website and wants to improve it or add AI features

They are NOT developers. They do NOT understand technical terms. Write as if talking to a smart friend who runs a business but has never written a line of code.

WRITING RULES:
1. NEVER include code blocks — this reader doesn't code and code will confuse them
2. Write in plain English — if you use a technical term, immediately explain it in simple words
3. Use real-world examples they can relate to: "a local plumber", "a 10-person marketing agency", "a café owner"
4. Be honest about costs, timelines, and tradeoffs — business owners respect straight talk
5. Use specific numbers to build credibility: "40% of users leave a website if it takes more than 3 seconds to load"
6. Every section must answer: "what does this mean for MY business?"
7. Naturally mention Aurion Stack's services where genuinely relevant — don't be pushy
8. End with a "Your Next Steps" section with 3 concrete things the reader can do right now
9. Length: 900–1,300 words. Don't pad. Don't ramble.
10. Tone: Confident, warm, and direct. Like a Forbes article written for Main Street, not Silicon Valley.

FRONTMATTER FORMAT (output this EXACTLY as the first thing, before the article body):
---
title: "[exact title provided]"
description: "[2-sentence SEO meta description, max 155 chars, targeted to business owners searching this topic]"
date: "${today}"
category: "[category provided]"
keywords: ${JSON.stringify(topic.keywords)}
readTime: "[X min read]"
icon: "${topic.icon}"
---`;

    const userPrompt = `Write a complete, publish-ready article for Aurion Stack\'s Insights blog with this exact title:

"${topic.title}"

Category: ${topic.category}
Target keywords (weave these in naturally): ${topic.keywords.join(', ')}

IMPORTANT:
- Write for a business owner, NOT a developer
- Zero code blocks — this is a business advice article
- Include a real-world mini story or example (e.g. "Sarah runs a hair salon in Manchester...")
- Mention how Aurion Stack can help exactly once, naturally, near the end
- End with "Your Next Steps" — 3 bullet points the reader can act on today
- Start with the YAML frontmatter block, then write the full article`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.75,
      max_tokens: 3000,
    });

    const markdownContent = completion.choices[0].message.content;
    if (!markdownContent) throw new Error('Groq returned empty content');

    // 5. Derive slug from the chosen title
    const slug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const filename = `${slug}.md`;
    const path = `src/content/insights/${filename}`;

    // 6. Commit to GitHub
    const { data: refData } = await octokit.git.getRef({ owner, repo, ref: `heads/${branch}` });
    const latestCommitSha = refData.object.sha;

    const { data: blobData } = await octokit.git.createBlob({
      owner,
      repo,
      content: Buffer.from(markdownContent).toString('base64'),
      encoding: 'base64',
    });

    const { data: treeData } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: latestCommitSha,
      tree: [{ path, mode: '100644', type: 'blob', sha: blobData.sha }],
    });

    const { data: commitData } = await octokit.git.createCommit({
      owner,
      repo,
      message: `feat(insights): auto-publish "${topic.title}"`,
      tree: treeData.sha,
      parents: [latestCommitSha],
    });

    await octokit.git.updateRef({ owner, repo, ref: `heads/${branch}`, sha: commitData.sha });

    // 7. Webhook notification (Discord/Slack)
    if (process.env.NOTIFICATION_WEBHOOK_URL) {
      try {
        const text = `✅ **New Auto-Post Published!**\n\n**📝 Title:** ${topic.title}\n**🏷 Category:** ${topic.category}\n**🔗 URL:** https://www.aurionstack.dev/insights/${slug}`;
        await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, content: text }),
        });
      } catch (e) {
        console.error('Webhook notification failed:', e);
      }
    }

    console.log(`
=========================================
✅  AURION STACK — AUTO BLOG PUBLISHED
=========================================
Title    : ${topic.title}
Category : ${topic.category}
Slug     : ${slug}
Model    : llama-3.3-70b-versatile (Groq)
Repo     : ${owner}/${repo}
URL      : https://www.aurionstack.dev/insights/${slug}
=========================================
    `);

    return NextResponse.json({
      success: true,
      title: topic.title,
      slug,
      url: `https://www.aurionstack.dev/insights/${slug}`,
    });

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Cron generate-post failed:', msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

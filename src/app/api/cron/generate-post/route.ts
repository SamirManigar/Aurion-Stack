import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import OpenAI from 'openai';

// Ensure the route requires authentication if called manually
export const maxDuration = 60; // Allow enough time for LLM generation

export async function GET(request: Request) {
  try {
    // 1. Verify Authentication
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!process.env.GITHUB_PAT || !process.env.GROQ_API_KEY) {
      return new NextResponse('Missing required API keys', { status: 500 });
    }

    // 2. Initialize AI and generate content using Groq
    const openai = new OpenAI({ 
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1' 
    });

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `You are a technical content writer for Aurion Stack, an AI-powered SaaS and automation agency.
          Your goal is to write a highly technical, engaging, and SEO-optimized blog post in Markdown format.
          The post should be about a trending topic in AI, Next.js, Vercel, or Web Development.
          
          You MUST output ONLY valid markdown. The output MUST begin with a YAML frontmatter block containing:
          - title
          - description
          - date (in YYYY-MM-DD format)
          - category (e.g., "AI & LLMs", "Web Development", "DevOps")
          - keywords (a JSON array of 4-6 strings)
          - readTime (e.g., "7 min read")
          - icon (one of: Brain, Globe, Zap, Smartphone, BarChart3)
          
          After the frontmatter, write a 1,000+ word article using proper H2, H3 tags, bold text, and code blocks where relevant.`
        },
        {
          role: "user",
          content: "Generate a new technical blog post for the Aurion Stack Insights page."
        }
      ],
      temperature: 0.7,
    });

    const markdownContent = completion.choices[0].message.content;
    
    if (!markdownContent) {
      throw new Error("Failed to generate content");
    }

    // 3. Extract slug from frontmatter to use as filename
    const titleMatch = markdownContent.match(/title:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : `auto-post-${Date.now()}`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const filename = `${slug}.md`;
    const path = `src/content/insights/${filename}`;

    // 4. Push to GitHub using Octokit
    const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
    const owner = process.env.GITHUB_OWNER || 'SamirManigar'; 
    const repo = process.env.GITHUB_REPO || 'Aurion-Stack';
    const branch = 'main';

    // Get the latest commit SHA
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`,
    });
    
    const latestCommitSha = refData.object.sha;

    // Create a blob with the new file content
    const { data: blobData } = await octokit.git.createBlob({
      owner,
      repo,
      content: markdownContent,
      encoding: 'utf-8',
    });

    // Create a new tree
    const { data: treeData } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: latestCommitSha,
      tree: [
        {
          path,
          mode: '100644',
          type: 'blob',
          sha: blobData.sha,
        },
      ],
    });

    // Create the commit
    const { data: commitData } = await octokit.git.createCommit({
      owner,
      repo,
      message: `docs(insights): Automated post generation - ${title}`,
      tree: treeData.sha,
      parents: [latestCommitSha],
    });

    // Update the reference
    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${branch}`,
      sha: commitData.sha,
    });

    return NextResponse.json({ success: true, message: `Successfully published ${filename}` });

  } catch (error: any) {
    console.error('Error generating post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

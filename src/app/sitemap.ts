import type { MetadataRoute } from 'next';

const solutionSlugs = [
  'ai-chatbot-for-shopify',
  'automate-customer-support-ecommerce',
  'reduce-cart-abandonment-ai',
  'ai-product-recommendation-engine',
  'ai-lead-generation-for-agencies',
  'automate-client-onboarding',
  'workflow-automation-for-service-businesses',
  'ai-content-automation-for-agencies',
  'custom-saas-development-for-startups',
  'ai-powered-dashboard-for-saas',
  'ai-chatbot-for-local-business',
  'ai-appointment-booking-system',
  'ai-youtube-script-generator',
  'ai-video-idea-generator-for-youtube',
  'saas-mvp-development-agency',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://aurionstack.dev';
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/auraiq`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/gaptuber`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/visioscript`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/businesszip`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const solutions: MetadataRoute.Sitemap = solutionSlugs.map((slug) => ({
    url: `${base}/solutions/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...core, ...solutions];
}

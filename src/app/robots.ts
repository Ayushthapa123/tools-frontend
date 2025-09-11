import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: [
      'https://www.toolsland.ai/sitemap.xml',
      'https://www.toolsland.ai/domain/sitemap.xml',
      'https://www.toolsland.ai/ai-type/sitemap.xml',
      "https://www.toolsland.ai/ai-capability/sitemap.xml",
      "https://www.toolsland.ai/product-type/sitemap.xml",
      "https://www.toolsland.ai/user-type/sitemap.xml",
    ],
  };
}

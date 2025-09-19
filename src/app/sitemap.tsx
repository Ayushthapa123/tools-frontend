


export const SitemapPage = async () => {
  const constantPages = [
    {
      url: 'https://www.toolsland.ai',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.toolsland.ai/login',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.toolsland.ai/signup',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.toolsland.ai/submit-ai-tool-free',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.toolsland.ai/thapaaayush115/ai-animal-name-generator-free',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.toolsland.ai/tools/dot-com-domain-generator',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.toolsland.ai/tools-categories',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.toolsland.ai/toolkits/seo-toolkits',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
   
 
    // {
    //   url: 'https://www.toolsland.ai/search',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 1,
    // },
 
    {
      url: 'https://www.toolsland.ai/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.toolsland.ai/terms-and-conditions',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.toolsland.ai/contact-us',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  
  ];




  return [...constantPages];
};

export default SitemapPage;

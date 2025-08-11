


export const SitemapPage = async () => {
  const constantPages = [
    {
      url: 'https://www.hostelpilot.com/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.hostelpilot.com/login',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.hostelpilot.com/signup',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.hostelpilot.com/tools',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.hostelpilot.com/tools/travel-budget-calculator',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.hostelpilot.com/blogs',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.hostelpilot.com/cities',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.hostelpilot.com/top-places',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.hostelpilot.com/search',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.hostelpilot.com/hostel',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // {
    //   url: 'https://hostelpilot.com/contact-us',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 1,
    // },
    {
      url: 'https://www.hostelpilot.com/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.hostelpilot.com/terms-and-conditions',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.hostelpilot.com/forms/hostel-search-form',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.hostelpilot.com/forms/hostel-sell-form',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];




  return [...constantPages];
};

export default SitemapPage;

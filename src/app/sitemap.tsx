


export const SitemapPage = async () => {
  const constantPages = [
    {
      url: 'https://hostelpilot.com/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://hostelpilot.com/blogs',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://hostelpilot.com/cities',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://hostelpilot.com/top-places',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://hostelpilot.com/search',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://hostelpilot.com/hostel',
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
      url: 'https://hostelpilot.com/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://hostelpilot.com/terms-and-conditions',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://hostelpilot.com/forms/hostel-search-form',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];




  return [...constantPages];
};

export default SitemapPage;

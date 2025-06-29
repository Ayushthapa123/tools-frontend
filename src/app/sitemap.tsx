


export const SitemapPage = async () => {
  const constantPages = [
    {
      url: 'https://hostelpilot.com/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://hostelpilot.com/blogs',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://hostelpilot.com/search',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://hostelpilot.com/hostels',
      lastModified: new Date(),
      changeFrequency: 'monthly',
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
      url: 'https://hosteltrend.com/terms-and-conditions',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];




  return [...constantPages];
};

export default SitemapPage;

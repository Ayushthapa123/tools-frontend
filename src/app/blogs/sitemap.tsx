import { createClient } from 'contentful';
import safeJsonStringify from 'safe-json-stringify';

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: space ?? '',
  accessToken: accessToken ?? '',
});

export const SitemapPage = async () => {


  const blogData = await client.getEntries({
    content_type: 'blogPost',
    skip: 0, //for the pagination
    limit: 100, // TODO need to update
    order: ['-sys.createdAt'], //- sign in the string for descending order
  });

  const stringifiedBlogPageData = safeJsonStringify(blogData);
  const blogPageData = JSON.parse(stringifiedBlogPageData);

  const blogDataSitemaps = blogPageData?.items?.map((item: any) => {
    return {
      url: `https://hostelpilot.com/blogs/${item.fields.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    };
  })??[];

  return [ ...blogDataSitemaps];
};

export default SitemapPage;

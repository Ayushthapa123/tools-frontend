// const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
import { createClient } from 'contentful';

import safeJsonStringify from 'safe-json-stringify';
import BlogCard from 'src/features/BlogCard';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import type { Metadata } from 'next';
import envConfig from 'src/config/envConfig';

const space = envConfig.contentfulSpaceId;
const accessToken = envConfig.contentfulAccessToken;

const client = createClient({
  space: space ?? '',
  accessToken: accessToken ?? '',
});



export const metadata: Metadata = {
  title: 'Hostelpilot Blogs: Read the latest news/trends in Hostel Industry',
  description:
    'Hostelpilot Blog Is a one stop shop for all the hostel industry related news,trends,research,ideas etc.',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/logo512.png',
    title: 'Hostelpilot Blogs: Read the latest news/trends in Hostel Industry',
  },
};

const HealthGuidePage = async () => {
  const blogData = await client.getEntries({
    content_type: 'blogPost',
    skip: 0, //for the pagination
    order: ['-sys.createdAt'], //- sign in the string for descending order
  });

  const stringifiedBlogPageData = safeJsonStringify(blogData);
  const blogPageData = JSON.parse(stringifiedBlogPageData);

  return (
    <section className='w-full'>
      <CommonNav />
      <div className="w-[90%] mx-auto grid gap-10 md:grid-cols-2 xl:grid-cols-3 mt-4">
        {blogPageData?.items?.map((data: any, index: number) => (
          <div key={index} className="">
            <BlogCard
              title={data.fields.title}
              description={data.fields.description}
              slug={data.fields.slug}
              date="Mar 30 2024"
              image={`https:${data.fields.coverphoto?.fields?.file?.url}`}
            />
          </div>
        ))}
      </div>
      {/* pagination */}
      <div className="flex items-center justify-between border-b mt-6 border-gray-100 pb-2 w-full gap-4">
          <button className="bg-gray-200 rounded-lg px-4 py-2 text-gray-700 w-fit">Previous</button>
          <button className="bg-gray-200 rounded-lg px-4 py-2 text-gray-700 w-fit">Next</button>
      </div>
    </section>
  );
};

export default HealthGuidePage;

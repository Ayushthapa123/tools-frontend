// const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
import { createClient } from 'contentful';

import safeJsonStringify from 'safe-json-stringify';
import BlogCard from 'src/features/BlogCard';
import { CommonNav } from 'src/features/NavBar/CommonNav';

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: space ?? '',
  accessToken: accessToken ?? '',
});

import type { Metadata } from 'next';

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
    <>
    <CommonNav />
      <div className="mt-9 flex flex-wrap gap-3 px-5 md:px-[80px]">

        {/* {JSON.stringify(blogPageData.items[0].fields.slug)} */}
      </div>
      <div className="grid gap-10 lg:grid-cols-3">
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
      <div className="flex items-center justify-center w-full ">
        <div className="join grid w-[300px] grid-cols-2">
          <button className="btn btn-outline join-item">Previous page</button>
          <button className="btn btn-outline join-item">Next</button>
        </div>
      </div>
    </>
  );
};

export default HealthGuidePage;

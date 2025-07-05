import { createClient } from 'contentful';
import Image from 'next/image';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';
import BlogCard from 'src/features/BlogCard';
import envConfig from 'src/config/envConfig';

const space = envConfig.contentfulSpaceId;
const accessToken = envConfig.contentfulAccessToken;

const client = createClient({
  space: space ?? '',
  accessToken: accessToken ?? '',
});
const BlogLists = async () => {
  const blogData = await client.getEntries({
    content_type: 'blogPost',
    skip: 0, //for the pagination
    limit: 6,
    order: ['-sys.createdAt'], //- sign in the string for descending order
  });

  const stringifiedBlogPageData = safeJsonStringify(blogData);
  const blogPageData = JSON.parse(stringifiedBlogPageData);


  return (
    <>
      <section className="pb-2 pt-5 lg:pb-3 ">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogPageData?.items?.map((data: any, index: number) => (
            <div key={index} className="">
              <BlogCard
                title={data.fields.title}
                description={data.fields.description}
                slug={data.fields.slug}
                date={data.fields?.publishedDate ?? ''}
                image={`https:${data.fields.coverphoto?.fields?.file?.url}`}
                content = {data.fields.body.content}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogLists;




import { Metadata } from 'next';
import { ResolvingMetadata } from 'next';
import { CityBlogPage } from './CityBlogPage';

import { gql } from 'graphql-request';
import { graphqlClient } from 'src/client/graphqlClient';
import { BlogPost, BlogPostData } from 'src/gql/graphql';



type Props = {
  params: { id: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};



export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params


  const res = await graphqlClient
  .request(
    gql`
      query GetBlogPostBySlug($slug: String!) {
        getBlogPostBySlug(slug: $slug) {
          data {
            title
            slug
            metaDescription
            coverImageUrl
            metaTitle
          }
        }
      }
    `,
    { slug: params.slug }
  )
  .then((data: any) => {
    return data.getBlogPostBySlug; // Returning the fetched data
  })
  .catch(error => {
    return null; // Return null in case of an error
  });


  return {
    title: res?.data?.metaTitle??"Top 10 Places",
    description: res?.data?.metaDescription??"",
    alternates: {
      canonical: `https://www.hostelpilot.com/top-places/${res?.data?.slug}`,
    },
    openGraph: {
      title: res?.data?.metaTitle??"",
      description: res?.data?.metaDescription??"",

      images: [res?.data?.coverImageUrl??`/assets/fallback-image.svg`],

    },
  };
}
// async function 
export default async function Home({ params }: { params: { slug: string } }) {
  const slug = params?.slug;


 
  const cityBlogData:any = await graphqlClient.request(gql`
    query GetBlogPostBySlug($slug: String!) {
      getBlogPostBySlug(slug: $slug) {
        data {
          title
          slug  
          content
          metaDescription
          coverImageUrl 
          excerpt
          metaTitle
          metaKeywords
          status
          views
          publishedAt
          createdAt
          updatedAt
          videoUrl
          oneLiner
        }
      }
    }
  `, { slug }); 

  const blogData:BlogPostData = cityBlogData.getBlogPostBySlug.data;

  

  return (
    <div className="w-full ">
      <CityBlogPage slug={blogData.slug} cityBlogData={blogData}  />
    </div>
  );
}

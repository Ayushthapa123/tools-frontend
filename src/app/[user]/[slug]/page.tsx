
import { Metadata } from 'next';
import { ResolvingMetadata } from 'next';
import { ToolPage } from './ToolPage';

import { gql } from 'graphql-request';
import { graphqlClient } from 'src/client/graphqlClient';
import { GetToolBySlug, ToolStatus } from 'src/gql/graphql';
import { Tool } from 'src/gql/graphql';



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
      query GetToolBySlug($slug: String!) {
        getToolBySlug(slug: $slug) {
          data {
            name
            slug
            toolMetadata {
              title
              description
              ogTitle
              ogDescription
              ogImageUrl
            }
         
          }
        }
      }
    `,
    { slug: params.slug }
  )
  .then((data: any) => {
    return data.getToolBySlug; // Returning the fetched data
  })
  .catch(error => {
    return null; // Return null in case of an error
  });


  return {
    title: res?.data?.toolMetadata?.title??"Toolsland.ai",
    description: res?.data?.toolMetadata?.description??"",
    authors: [{ name: 'Ayush Thapa' }],
    manifest: '/manifest.json', 
    
    openGraph: {
      title: res?.data?.toolMetadata?.title??"",
      description: res?.data?.toolMetadata?.description??"",
      
      images: [
        {
          url: res?.data?.toolMetadata?.ogImageUrl
            ? res?.data?.toolMetadata?.ogImageUrl
            : `/assets/fallback-image.svg`,
          alt: res?.data?.name ?? "Toolsland.ai",
        }
      ],
    },
  };
}
// async function 
export default async function Home({ params }: { params: { slug: string } }) {
  const slug = params?.slug;

  const data:any = await graphqlClient.request(GetToolBySlug, { slug, toolStatus: ToolStatus.Published }) 

  const toolData = data?.getToolBySlug;

  

  return (
    <div className="w-full ">
      <ToolPage slug={slug} toolData={toolData as Tool} />
    </div>
  );
}

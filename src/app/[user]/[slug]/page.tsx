
import { Metadata } from 'next';
import { ResolvingMetadata } from 'next';
import { ToolPage } from './ToolPage';
import safeJsonStringify from 'safe-json-stringify';

import { gql } from 'graphql-request';
import { graphqlClient } from 'src/client/graphqlClient';
import { GetToolBySlug } from 'src/gql/graphql';
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
            description
         
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
    title: res?.data?.name??"Hostel",
    description: res?.data?.description??"",
    openGraph: {
      title: res?.data?.name??"",
      description: res?.data?.description??"",
      images: res?.data?.coverphoto?.url
        ? 'https:' + res?.data?.coverphoto?.url
        : `/assets/fallback-image.svg`,
    },
  };
}
// async function 
export default async function Home({ params }: { params: { slug: string } }) {
  const slug = params?.slug;

  const data:any = await graphqlClient.request(GetToolBySlug, { slug }) 

  const toolData = data?.getToolBySlug;

  

  return (
    <div className="w-full ">
      <ToolPage slug={slug} toolData={toolData as Tool} />
    </div>
  );
}

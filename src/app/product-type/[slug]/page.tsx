
import { Metadata } from 'next';
import { ResolvingMetadata } from 'next';
import { BlogPage } from '../../../features/BlogPage';

import { gql } from 'graphql-request';
import { graphqlClient } from 'src/client/graphqlClient';
import { GetListedAiToolsByProductType, ListedAiToolList } from 'src/gql/graphql';
import { Tool } from 'src/gql/graphql';
import { domainConfig } from 'src/config/domainConfig';
import { ProductType } from 'src/gql/graphql';
import BlogPageHeader from 'src/features/BlogPage/BlogPageHeader';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { enumToText } from 'src/utils/enumToText';

type Props = {
  params: { id: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params 
  const slug = params.slug; 
  const currentProductType = slug.split('-').pop();// current product type is present at the slug at the end



  return {
    title: `Top 30 AI ${currentProductType} tools - Toolsland.ai`,
    description: `Top 30 AI ${currentProductType} toolslist with features, pricing,demo and use cases`,
    authors: [{ name: 'Ayush Thapa' }],
    manifest: '/manifest.json', 
    alternates: {
      canonical: `https://www.toolsland.ai/product-type/ai-${currentProductType}`,
    },
    openGraph: {
      title: `Top 30 AI ${currentProductType} tools - Toolsland.ai`,
      description: `Top 30 AI ${currentProductType} tools list with features, pricing,demo and use cases`,
      images: domainConfig.coverImage,
    }, 

    // also add canonical url 
    
  };
}
// async function 
export default async function Home({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const currentProductType = slug.split('-').pop()?.toUpperCase() as ProductType;

  const data:any = await graphqlClient.request(GetListedAiToolsByProductType, { productType: currentProductType,pageSize: 30,page:1 }) 

  const toolData = data?.getListedAiToolsByProductType;

  
  return (
    <div className="w-full ">
          <CommonNav />
          <BlogPageHeader title={`Top 30 AI ${enumToText(currentProductType)} tools`} />
      
      <BlogPage slug={slug} toolData={toolData as ListedAiToolList} />
    </div>
  );
}


import { Metadata } from 'next';
import { ResolvingMetadata } from 'next';
import { BlogPage } from '../../../features/BlogPage';

import { graphqlClient } from 'src/client/graphqlClient';
import { GetListedAiToolsByAiCapability, GetListedAiToolsByAiType, GetListedAiToolsByProductType, ListedAiToolList } from 'src/gql/graphql';
import { domainConfig } from 'src/config/domainConfig';
import { slugToEnum } from 'src/utils/slugToEnum';
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
  const currentAiCapability = slugToEnum(slug);// current product type is present at the slug at the end



  return {
    title: `Top 30 ${enumToText(currentAiCapability)} tools - Toolsland.ai`,
    description: `Top 30  ${enumToText(currentAiCapability)} tools list with features, pricing,demo and use cases`,
    authors: [{ name: 'Ayush Thapa' }],
    manifest: '/manifest.json', 
    alternates: {
      canonical: `https://www.toolsland.ai/ai-capability/${currentAiCapability}`,
    },
    openGraph: {
      title: `Top 30 ${enumToText(currentAiCapability)} tools - Toolsland.ai`,
      description: `Top 30 ${enumToText(currentAiCapability)} tools list with features, pricing,demo and use cases`,
      images: domainConfig.coverImage,
    }, 

    // also add canonical url 
    
  };
}
// async function 
export default async function Home({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const currentAiCapability = slugToEnum(slug);// current product type is present at the slug at the end

  const data:any = await graphqlClient.request(GetListedAiToolsByAiCapability, { aiCapability: currentAiCapability,pageSize: 30,page:1 }) 

  const toolData = data?.getListedAiToolsByAiCapability;

  
  return (
    <div className="w-full ">
        <CommonNav />
     <BlogPageHeader title={`Top 30  ${enumToText(currentAiCapability)} tools`} />
      
      <BlogPage slug={slug} toolData={toolData as ListedAiToolList} />
    </div>
  );
}

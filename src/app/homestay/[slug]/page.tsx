"use client";
import { Metadata, ResolvingMetadata } from 'next';
import { HostelPage } from './HostelPage';

import { gql } from 'graphql-request';
import { graphqlClient } from 'src/client/graphqlClient';
import { useSearchParams } from 'next/navigation';

type Props = {
  params: { id: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const slug = params.slug;
 

//   const query = gql`
//         query getHomestayMetaBySlug($slug: String!) {
//           getHomestayBySlug(slug: $slug) {
//             name
//             description
//             slug
            
//           }
//         }
//       `
    
//   const variables = {
//     slug: params.slug,
//   };

//   const res = await graphqlClient
//     .request(query, variables)
//     .then((data: any) => {
//       return  data.getHomestayBySlug // Returning the fetched data
//     })
//     .catch(error => {
//       console.error(error);
//       return null; // Return null in case of an error
//     });

//   console.log('rrrrrrrrrrrrrr', res);

//   // Safeguard against errors by checking if res exists
//   if (!res) {
//     return {
//       title: 'Error loading metadata',
//     };
//   }

//   return {
//     title: res?.name || 'Homestay',
//     description: res?.description || 'Homestay',
//     openGraph: {
//       title: res?.name,
//       description: res?.description,
//       images: `/images/default-image.png` 
//     },
//   };
// }

export default function Home({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const checkInDate = useSearchParams().get("checkInDate") ?? "";
  const checkOutDate = useSearchParams().get("checkOutDate") ?? "";
  const slugArray = slug.split('-');


  return (
    <div className="w-full ">
      <HostelPage slug={slug} checkInDat={checkInDate} checkOutDat={ checkOutDate} /> 
    </div>
  );
}

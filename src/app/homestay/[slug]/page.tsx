"use client";
import { HomestayPage } from './HomestayPage'; 

import { useSearchParams } from 'next/navigation';


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


  return (
    <div className="w-full ">
      <HomestayPage slug={slug} checkInDat={checkInDate} checkOutDat={ checkOutDate} /> 
    </div>
  );
}

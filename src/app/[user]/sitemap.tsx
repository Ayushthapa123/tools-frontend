
import { gql } from 'graphql-request';
import { graphqlClient } from 'src/client/graphqlClient';
export const SitemapPage = async () => {

  //Original Hostels

  const hostelQuery = gql`
  query getAllOriginalHostelsSlug {
      getAllHostels(pageSize: 200, pageNumber: 1, isSuperAdmin: true) {
        data {
          slug
          
        }
      }
    }
  `;

  const res = await graphqlClient
    .request(hostelQuery)
    .then((data: any) => {
      return data.getAllHostels; // Returning the fetched data
    })
    .catch(error => {
      console.error(error);
      return null; // Return null in case of an error
    });
  const originalHostelSitemaps =
   res?.data?.map((item: any) => {
    return {
      url: `https://hostelpilot.com/hostel/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    };
  })??[];
  //Shostels

  const originalHostelApplicationSitemaps =
  res?.data?.map((item: any) => {
   return {
     url: `https://hostelpilot.com/hostel/${item.slug}/application`,
     lastModified: new Date(),
     changeFrequency: 'weekly',
     priority: 1,
   };
 })??[];



  return [...originalHostelSitemaps, ...originalHostelApplicationSitemaps];
};

export default SitemapPage;

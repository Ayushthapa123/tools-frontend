
import { gql } from 'graphql-request';
import { graphqlClient } from 'src/client/graphqlClient';
export const SitemapPage = async () => {

  //Original Hostels

  const hostelQuery = gql`
  query getAllOriginalHostelsSlug {
      getAllHostels(pageSize: 100, pageNumber: 1, isSuperAdmin: true) {
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
    console.log(item);
    return {
      url: `https://hostelpilot.com/hostel/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    };
  })??[];
  //Shostels



  return [...originalHostelSitemaps];
};

export default SitemapPage;

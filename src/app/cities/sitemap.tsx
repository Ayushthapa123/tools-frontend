
import { gql } from 'graphql-request';
import { graphqlClient } from 'src/client/graphqlClient';
import { BlogTags, BlogStatus } from 'src/gql/graphql';
export const SitemapPage = async () => {

  //Original Hostels

  const hostelQuery = gql`
  query getAllCityBlogsSlug {
      getAllBlogPosts(pageSize: 100, pageNumber: 1,blogTags: [${BlogTags.City}],blogStatus: ${BlogStatus.Published}) {
        data {
          slug 
          
        }
      }
    }
  `;

  const res = await graphqlClient
    .request(hostelQuery)
    .then((data: any) => {
      return data.getAllBlogPosts; // Returning the fetched data
    })
    .catch(error => {
      console.error(error);
      return null; // Return null in case of an error
    });
  const originalCityBlogsSitemaps =
   res?.data?.map((item: any) => {
    return {
      url: `https://hostelpilot.com/cities/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    };
  })??[];
  //Shostels



  return [...originalCityBlogsSitemaps];
};

export default SitemapPage;

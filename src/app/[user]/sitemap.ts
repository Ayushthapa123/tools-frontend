import { AiType, ProductType } from 'src/gql/graphql';
import { convertToSlug } from 'src/utils/convertToSlug';
import { enumToOptions } from 'src/utils/enumToArray';

import { gql } from 'graphql-request';
import { graphqlClient } from 'src/client/graphqlClient';
export const SitemapPage = async () => {
  const toolsQuery = gql`
    query {
      getAllTools {
        data {
          slug
          name
          owner {
            username
          }
        }
      }
    }
  `;

  const res = await graphqlClient
    .request(toolsQuery)
    .then((data: any) => {
      return data.getAllTools; // Returning the fetched data
    })
    .catch(error => {
      console.error(error);
      return null; // Return null in case of an error
    });
  const toolsSitemaps =
    res?.data?.map((item: any) => {
      return {
        url: `https://www.toolsland.ai/${item.owner.username}/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      };
    }) ?? [];

  return [...toolsSitemaps];
};

export default SitemapPage;


import {  Domain } from 'src/gql/graphql';
import { convertToSlug } from 'src/utils/convertToSlug';
import { enumToOptions } from 'src/utils/enumToArray';
export const SitemapPage = async () => {



  const res = enumToOptions(Domain)
  const data =
   res?.filter((item) => item.value !== Domain.Other)?.map((item) => {
    return {
      url: `https://www.toolsland.ai/domain/${convertToSlug(item.value.toLowerCase())}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    };
  })??[];
  //Shostels

  return [...data];
};

export default SitemapPage;

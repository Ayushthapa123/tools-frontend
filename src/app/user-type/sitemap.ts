
import {  Domain, ToolUserType } from 'src/gql/graphql';
import { convertToSlug } from 'src/utils/convertToSlug';
import { enumToOptions } from 'src/utils/enumToArray';
export const SitemapPage = async () => {



  const res = enumToOptions(ToolUserType)
  const data =
   res?.filter((item) => item.value !== ToolUserType.Other)?.map((item) => {
    return {
      url: `https://www.toolsland.ai/user-type/${convertToSlug(item.value.toLowerCase())}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    };
  })??[];
  //Shostels

  return [...data];
};

export default SitemapPage;

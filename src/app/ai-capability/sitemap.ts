
import { AiCapability, AiType, ProductType } from 'src/gql/graphql';
import { convertToSlug } from 'src/utils/convertToSlug';
import { enumToOptions } from 'src/utils/enumToArray';
export const SitemapPage = async () => {



  const res = enumToOptions(AiCapability)
  const data =
   res?.filter((item) => item.value !== AiType.Other)?.map((item) => {
    return {
      url: `https://www.toolsland.ai/ai-capability/${convertToSlug(item.value.toLowerCase())}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    };
  })??[];
  //Shostels

  return [...data];
};

export default SitemapPage;


import { ProductType } from 'src/gql/graphql';
import { enumToOptions } from 'src/utils/enumToArray';
export const SitemapPage = async () => {



  const res = enumToOptions(ProductType)
  const data =
   res?.filter((item) => item.value !== ProductType.Other)?.map((item) => {
    return {
      url: `https://www.toolsland.ai/product-type/ai-${item.value.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    };
  })??[];
  //Shostels

  return [...data];
};

export default SitemapPage;

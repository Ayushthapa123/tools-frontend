import { Price } from "src/gql/graphql";

export const getTodayPrice = (price: Price) => {
  const { isDynamicPricing, baseAmount } = price?.data??{isDynamicPricing:false, baseAmount:0};

  return baseAmount;
};

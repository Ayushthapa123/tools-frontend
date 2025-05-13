import { Price } from "src/gql/graphql";

export const getTodayPrice = (price: Price) => {
  const { isDynamicPricing, baseAmount } = price;

  return baseAmount;
};

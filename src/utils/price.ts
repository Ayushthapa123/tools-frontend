import { Price } from 'src/gql/graphql';

export const getTodayPrice = (price: Price) => {
  const { isDynamicPricing, baseAmountPerDay } = price?.data ?? {
    isDynamicPricing: false,
    baseAmountPerDay: 0,
  };

  return baseAmountPerDay;
};

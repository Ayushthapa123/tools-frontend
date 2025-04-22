import { Price } from "src/gql/graphql";

export const getTodayPrice = (price: Price) => {
  const { isDynamicPricing, dynamicPriceStart, dynamicPriceEnd, dynamicAmount, baseAmount } = price;

  if (isDynamicPricing) {
    // if it is weekend, return dynamic amount 
    const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
    if (isWeekend) {
      return dynamicAmount;
    }
    const today = new Date();
    const startDate = new Date(dynamicPriceStart);
    const endDate = new Date(dynamicPriceEnd);

    if (today >= startDate && today <= endDate) {
        
      return dynamicAmount;
    }
  }

  return baseAmount;
};


export const getTodayPrice = (price: any) => {
  const { isDynamicPricing, baseAmountPerDay } = price?.data ?? {
    isDynamicPricing: false,
    baseAmountPerDay: 0,
  };

  return baseAmountPerDay;
};

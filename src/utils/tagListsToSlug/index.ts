export const tagsListToSlug = (list: Array<any>): string => {
  let appropSlug = '';
  

  if(list?.length) {
  for (let i = 0; i < list?.length; i++) {
    if (list?.[i]?.sys?.id === 'healthTech') {
      appropSlug = 'health-tech';
      break;
    } else if (list?.[i]?.sys?.id === 'healthGuides') {
      appropSlug = 'health-guides';
      break;
    } else if (list?.[i]?.sys?.id === 'healthIndicators') {
      appropSlug = 'health-indicators';
      break;
    } else if (list?.[i]?.sys?.id === 'learn') {
      appropSlug = 'learn';
      break;
    } 
  }
}

  return appropSlug;
};

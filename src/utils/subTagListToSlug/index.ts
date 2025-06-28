export const subTagsListToSlug = (list: Array<any>): string => {
  let appropSlug = '';

  if (list?.length) {
    for (let i = 0; i < list?.length; i++) {
      if (list?.[i]?.sys?.id == 'healthInsurance') {
        appropSlug = 'health-insurance';
        break;
      } else if (list?.[i]?.sys?.id == 'futureTech') {
        appropSlug = 'future-tech';
        break;
      } else if (list?.[i]?.sys?.id == 'healthApps') {
        appropSlug = 'health-apps';
        break;
      } else if (list?.[i]?.sys?.id == 'wearableTech') {
        appropSlug = 'wearable-tech';
        break;
      } else if (list?.[i]?.sys?.id == 'bioMarkers') {
        appropSlug = 'bio-markers';
        break;
      } else if (list?.[i]?.sys?.id == 'screening') {
        appropSlug = 'screening';
        break;
      } else if (list?.[i]?.sys?.id == 'tests') {
        appropSlug = 'tests';
        break;
      } else if (list?.[i]?.sys?.id == 'body') {
        appropSlug = 'body';
        break;
      } else if (list?.[i]?.sys?.id == 'brain') {
        appropSlug = 'brain';
        break;
      } else if (list?.[i]?.sys?.id == 'nutrition') {
        appropSlug = 'nutrition';
        break;
      } 
    }
  }

  return appropSlug;
};

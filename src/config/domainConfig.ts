
const appName = process.env.NEXT_PUBLIC_APP_NAME;

export const domainConfig = {
  appName: appName === 'hosteladmin' ? 'hosteladmin' : "hostelpilot",
  appUrl: appName === 'hosteladmin' ? 'https://hosteladmin.com' : `https://hostelpilot.com`,
  appSlogan: appName === 'hosteladmin' ? 'Hosteladmin-Hostel Management System' : 'Hostelpilot-Search Nearby Hostels',
  appDescription: appName === 'hosteladmin' ? 'HostelAdmin offers a comprehensive platform that allows you to seamlessly upload and manage all the details of your hostel online. By leveraging our user-friendly interface, you can ensure that potential guests can easily find your hostel, check availability, and reach out to you directly.' :
   'Welcome to Hostelpilot.com, your go-to platform for finding the perfect hostel, we make your search quick and easy!',
};

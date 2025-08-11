
const appName = process.env.NEXT_PUBLIC_APP_NAME;

export const domainConfig = {
  appName: appName === 'hosteladmin' ? 'hosteladmin' : "hostelpilot",
  appUrl: appName === 'hosteladmin' ? 'https://hosteladmin.com' : `https://hostelpilot.com`,
  logo: appName === 'hosteladmin' ? '/logo512.png' : '/logohp512.png',
  appSlogan: appName === 'hosteladmin' ? 'Hosteladmin-Manage and grow your hostel business' : 'Hostelpilot-Search Nearby Hostels',
  appDescription: appName === 'hosteladmin' ? 'Hosteladmin helps you by saving your time and money to manage your hostel business as well as grow your business with digital presence and marketing' :
   'Hostelpilot helps you to find the best hostel nearby you with just a click.It is a platform for hostel seekers to find the best hostel nearby them.',
};

export const isHostelAdmin = appName === 'hosteladmin'; 
export const isHostelPilot = appName === 'hostelpilot';

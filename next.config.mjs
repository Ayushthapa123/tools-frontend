import createPWAConfig from 'next-pwa';

const withPWA = createPWAConfig({
  dest: 'public',

  cacheOnFrontEndNav: true,
    reloadOnOnline: true,
    disable: false,
    register: true,
    skipWaiting: true,
});

const config = {
  Server: {
    port: 80,
  },
  images: {
    domains: ["images.unsplash.com","s3-np1.datahub.com.np"],
  },
};

export default process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV' ? withPWA(config) : withPWA(config);

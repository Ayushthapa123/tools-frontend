
import type { Metadata } from 'next';

import { domainConfig } from 'src/config/domainConfig';

export const metadata: Metadata = {
  title: domainConfig.appSlogan, 
  description:domainConfig.appDescription,
  authors: [{ name: 'Ayush Thapa' }],
  manifest: '/manifest.json',
  openGraph: {
    images: [
      {
        url: domainConfig.logo,
        width: 512,
        height: 512,
      },
    ],
    title: domainConfig.appSlogan,

  },
};

export default function Home() {
  return (
    <div className="  relative  mx-auto h-auto w-full max-w-[2100px] bg-base-100 ">
      <main className="relative ">
       
      </main>
    </div>
  );
}

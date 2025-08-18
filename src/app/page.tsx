
import type { Metadata } from 'next';

import { domainConfig, isHostelAdmin, isHostelPilot } from 'src/config/domainConfig';

import MainContent from './MainContent';
export const metadata: Metadata = {
  title: domainConfig.appSlogan, 
  description:domainConfig.appDescription,
  authors: [{ name: 'Ayush Thapa' }],
  manifest: isHostelPilot ? '/manifest-hostelpilot.json' : '/manifest.json',
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
        <MainContent >
          <div>hello</div>
        </MainContent>
      </main>
    </div>
  );
}

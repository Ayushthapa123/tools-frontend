
import type { Metadata } from 'next';

import { domainConfig } from 'src/config/domainConfig';

import MainContent from '../MainContent';
export const metadata: Metadata = {
  title: "Find Best AI tools", 
  description:"With .. Our website gets updated everyday with latest AI tools, you will never miss out on any new tools. Best place to find AI tools.",
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
    title: "Find Best AI tools",

  },
};

export default function Home() {
  return (
    <div className="  relative  mx-auto h-auto w-full max-w-[2100px] bg-base-100 ">
      <main className="relative ">
        <MainContent >
          <div/>
        <div>Search</div>

        </MainContent>
      </main>
    </div>
  );
}


import type { Metadata } from 'next';

import { domainConfig } from 'src/config/domainConfig';

import MainContent from '../MainContent';
import { CommonNav } from 'src/features/NavBar/CommonNav';
export const metadata: Metadata = {
  title: "Find Best AI tools", 
  description:"With Toolsland.ai find the perfect ai tools that will help you with your business, marketing, coding, design, and more.",
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
        <CommonNav />
        <MainContent >
          <div/>

        </MainContent>
      </main>
    </div>
  );
}

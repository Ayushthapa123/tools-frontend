
import type { Metadata } from 'next';

import { domainConfig } from 'src/config/domainConfig';

import MainContentSSR from './MainContentSSR';
import Footer from 'src/features/Footer';
export const metadata: Metadata = {
  title: "Research, Discover & List the Best AI Tools",
  description:
    "Find the best AI tools from 10000+ AI tools for business, marketing, coding, design, and more at Toolsland.ai. Browse thousands of AI tools, compare features, and list your own AI tool for free.",
  authors: [{ name: "Ayush Thapa" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "Toolsland.ai – AI Tools Directory",
    description:
      "Explore thousands of AI tools to boost productivity, marketing, coding, and design. Toolsland.ai also lets you list your AI tool for free.",
    images: [
      {
        url: domainConfig.coverImage,
        width: 1200,
        height: 630,
        alt: "Toolsland.ai – AI Tools Directory",
      },
    ],
  },
  keywords: [
    "AI tools directory",
    "best AI tools",
    "AI for business",
    "AI for marketing",
    "AI coding tools",
    "list AI tools",
    "free AI tools",
  ],
  alternates: {
    canonical: "https://www.toolsland.ai",
  },
};


export default function Home() {
  return (
    <div className="  relative  mx-auto h-auto w-full max-w-[2100px] bg-base-100 ">
      <main className="relative ">
        <MainContentSSR >
          <div>
            {/* <h1 className='text-3xl font-bold'>AI Tools</h1> */}
          </div>
        </MainContentSSR>
        <Footer/>
      </main>
    </div>  
  );
}

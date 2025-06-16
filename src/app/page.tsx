import { CommonNav } from 'src/features/NavBar/CommonNav';

import type { Metadata } from 'next';
import { Header } from 'src/features/landing-page/Header';
import Footer from 'src/features/Footer';
import { domainConfig, isHostelAdmin, isHostelPilot } from 'src/config/domainConfig';
import HostelAdminHeader from 'src/features/landing-page/Header/HostelAdminHeader';
import { SoftwareFeatures } from 'src/features/landing-page/SoftwareFeatures/page';
export const metadata: Metadata = {
  title: domainConfig.appSlogan, 
  description:domainConfig.appDescription,
  authors: [{ name: 'Ayush Thapa' }],
  manifest: isHostelPilot ? '/manifest-hostelpilot.json' : '/manifest.json',
  openGraph: {
    images: [
      {
        url: '/logo512.png',
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
        <div className="">
          <CommonNav />
          {isHostelAdmin ?<HostelAdminHeader />:<Header />}
          {isHostelAdmin ?<SoftwareFeatures />:<></>}
          <Footer />
        </div>
      </main>
    </div>
  );
}

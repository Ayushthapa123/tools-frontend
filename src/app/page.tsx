import { CommonNav } from 'src/features/NavBar/CommonNav';

import type { Metadata } from 'next';
import { Header } from 'src/features/landing-page/Header';
import Footer from 'src/features/Footer';
import { domainConfig } from 'src/config/domainConfig';
import HostelAdminHeader from 'src/features/landing-page/Header/HostelAdminHeader';
export const metadata: Metadata = {
  title: domainConfig.appSlogan, 
  description:domainConfig.appDescription,
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/logo512.png',
    title: domainConfig.appSlogan,
  },
};

export default function Home() {
  return (
    <div className="  relative  mx-auto h-auto w-full max-w-[2100px] bg-base-100 ">
      <main className="relative ">
        <div className="">
          <CommonNav />
          {domainConfig.appName == 'hosteladmin' ?<HostelAdminHeader />:<Header />}
          <Footer />
        </div>
      </main>
    </div>
  );
}

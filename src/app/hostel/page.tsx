// import { SearchBox } from 'src/features/Header/SearchBox';
import Footer from 'src/features/Footer';

import { Suspense } from 'react';

import { Metadata } from 'next';
import { isHostelPilot } from 'src/config/domainConfig';
import { SearchBox } from 'src/features/landing-page/Header/SearchBox';
import { MapProvider } from 'src/features/MapProvider';
export const metadata: Metadata = {
  title: 'Hostel Lists',
  description: 'Hostelpilot is a hotel searching portal specially focused on providing the best hostel',
  manifest: isHostelPilot ? '/manifest-hostelpilot.json' : '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/logohp512.png',
    title: 'Hostelpilot: all the hostel list',
  },
};

export default function Home() {
  return (
    <div className="w-full ">
      <div className="    mx-auto h-full max-w-[1800px]  border-b bg-white py-3 shadow-md">
        <Suspense>
          <MapProvider>
            <SearchBox />
          </MapProvider>
        </Suspense>
      </div>

      <div className="w-full py-10 md:px-10"></div>
      <Footer />
    </div>
  );
}

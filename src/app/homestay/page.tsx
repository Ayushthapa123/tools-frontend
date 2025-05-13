import { SearchBox } from 'src/features/Header/SearchBox';
import Footer from 'src/features/Footer';

import { Suspense } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Homestay Lists',
  description:
    'Homestay is a hotel searching portal specially focused on providing the best homestay',
  manifest: '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/logo512.png',
    title: 'Homestay: all the hotel list',
  },
};

export default function Home() {
  return (
    <div className="w-full ">
      <div className="    mx-auto h-full max-w-[1800px]  border-b bg-white py-3 shadow-md">
        <Suspense>
          <SearchBox />
        </Suspense>
      </div>

      <div className="w-full py-10 md:px-10">
      </div>
      <Footer />
    </div>
  );
}

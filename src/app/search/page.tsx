import { Suspense } from 'react';

import { SearchPage } from './SearchPage';
import { Metadata } from 'next';
import { Header } from 'src/features/Header';
import Footer from 'src/features/Footer';
import { CommonNav } from 'src/features/NavBar/CommonNav';

export const metadata: Metadata = {
  title: 'Homestay  For Students And Young Professionals',
  description:
    'Homestays is a hotel searching portal specially focused on providing the best hotels for students and young professionals in their city',
  manifest: '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/logo512.png',
    title: 'Search Homestays in your city',
  },
};

export default function Home() {
  return (
    <div>
      <Suspense>
        <CommonNav />
        <SearchPage />
        <Footer />
      </Suspense>
    </div>
  );
}

interface IResults {
  country: string;
  city: string;
  subCity: string;
  hostelType: string;
  genderType: string;
  handleCount: (c: number) => void;
}

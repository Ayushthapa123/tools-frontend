import { Header as Header1 } from 'src/features/landing-page/Header1';
import { CommonNav } from 'src/features/NavBar/CommonNav';

import type { Metadata } from 'next';
import { CheckSession } from 'src/features/CheckSession';
import { Header } from 'src/features/landing-page/Header';
import Footer from 'src/features/Footer';
export const metadata: Metadata = {
  title: 'Hotel Management System-Manage Your Hotel Informations Online',
  description:
    'homestay offers a comprehensive platform that allows you to seamlessly upload and manage all the details of your homestay online. By leveraging our user-friendly interface, you can ensure that potential guests can easily find your homestay, check availability, and reach out to you directly',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/home-stay-logo.png',
    title: 'homestay- Manage Your Homestay Informations Online',
  },
};

export default function Home() {
  return (
    <div className="  relative  mx-auto h-auto w-full max-w-[2100px] bg-base-100 ">
      {/* <Image src={'/bg.png'} fill alt=''/> */}
      <main className="relative ">
        <div className="">
          <CheckSession />
          <CommonNav />
          <Header />
          <Footer />
          {/* <Header1 /> */}
        </div>
      </main>
    </div>
  );
}

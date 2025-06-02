import { CommonNav } from 'src/features/NavBar/CommonNav';

import type { Metadata } from 'next';
import { Header } from 'src/features/landing-page/Header';
import Footer from 'src/features/Footer';
export const metadata: Metadata = {
  title: 'Hostel  Management System-Manage Your Hotel Informations Online', 
  description:
    'hosteladmin offers a comprehensive platform that allows you to seamlessly upload and manage all the details of your hostel online. By leveraging our user-friendly interface, you can ensure that potential guests can easily find your hostel, check availability, and reach out to you directly',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/logo.png',
    title: 'hostel- Manage Your hostel Informations Online',
  },
};

export default function Home() {
  return (
    <div className="  relative  mx-auto h-auto w-full max-w-[2100px] bg-base-100 ">
      {/* <Image src={'/bg.png'} fill alt=''/> */}
      <main className="relative ">
        <div className="">
          <CommonNav />
          <Header />
          <Footer />
          {/* <Header1 /> */}
        </div>
      </main>
    </div>
  );
}

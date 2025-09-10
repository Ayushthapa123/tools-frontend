// import { SearchBox } from 'src/features/Header/SearchBox';
import Footer from 'src/features/Footer';


import { Metadata } from 'next';
import { CommonNav } from 'src/features/NavBar/CommonNav';
export const metadata: Metadata = {
  title: 'Ai Product Types - Toolsland.ai',
  description: 'Toolsland.ai is a platform for discovering and listing the best AI tools for business, marketing, coding, design, and more.',
  manifest: '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/logohp512.png',
    title: 'Ai Product Types - Toolsland.ai',
  },
};

export default function Home() {
  return (
    <div className="w-full ">
      <CommonNav/>
      <div className="    mx-auto h-full max-w-[1800px]  border-b bg-white py-3 shadow-md">
        
      </div>

      <div className="w-full py-10 md:px-10"></div>
      <Footer />
    </div>
  );
}

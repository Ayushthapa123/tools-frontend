
import React, {  } from 'react';




import { SearchForm } from './SearchForm';
import { Metadata } from 'next';
import { isHostelPilot } from 'src/config/domainConfig';
import { CommonNav } from 'src/features/NavBar/CommonNav';

export const metadata: Metadata = {
  title: "Hostel Search Form", 
  description:"Are you searching for suitable Hostel in your location?. Now we will help you to find perfect hostel for you.",
  authors: [{ name: 'Ayush Thapa' }],
  manifest: isHostelPilot ? '/manifest-hostelpilot.json' : '/manifest.json',
  openGraph: {
    images: [
      {
        url: 'https://www.hostelpilot.com/searching-for-hostel.png',
      },
    ],
    title: "Hostel Search Form",

  },
};
export default function Home() {
  return (
    <div>
      <CommonNav/>
    
        <GuestForm />
      
    </div>
  );
}

function GuestForm() {

  return <section className=" p-4 md:p-8"> 
    <div className="flex flex-col gap-4 max-w-7xl mx-auto ">
      <div className="flex flex-col gap-4 text-center">
      <h1 className="md:text-6xl text-4xl font-bold text-gray-500 py-10">Hostel Search Form</h1>
      </div>
      <SearchForm />
    </div>
  </section>;
}

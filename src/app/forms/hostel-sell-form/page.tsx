
import React, {  } from 'react';


import { SellForm } from './SellForm';
import { Metadata } from 'next';
import { isHostelPilot } from 'src/config/domainConfig';
import { CommonNav } from 'src/features/NavBar/CommonNav';

export const metadata: Metadata = {
  title: "Hostel Sell Form", 
  description:"Are you selling your hostel?. Now we will help you to sell your hostel.",
  authors: [{ name: 'Ayush Thapa' }],
  manifest: isHostelPilot ? '/manifest-hostelpilot.json' : '/manifest.json',
  openGraph: {
    images: [
      {
        url: 'https://www.hostelpilot.com/sell-hostel.png',
        type: 'image/png',
        alt: 'Hostel Sell Form',
        width: 1200,
        height: 630,
      },
    ],
    title: "Hostel Sell Form",

  },
};
export default function Home() {
  return (
    <div>
      <CommonNav/>
      <HostelSellForm />
    </div>
  );
}

function HostelSellForm() {

  return <section className=" p-4 md:p-8"> 
    <div className="flex flex-col gap-4 max-w-7xl mx-auto ">
      <div className="flex flex-col gap-4 text-center">
      <h1 className="md:text-6xl text-4xl font-bold text-gray-500 py-10">Hostel Sellling Application Form</h1>
      </div>
      <SellForm />
    </div>
  </section>;
}

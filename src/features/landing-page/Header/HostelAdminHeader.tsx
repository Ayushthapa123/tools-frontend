import React from 'react';
import Image from 'next/image';
import Button from 'src/components/Button';
import { domainConfig } from 'src/config/domainConfig';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
export default function HostelAdminHeader() {
  return (
    <header className="flex flex-col md:flex-row items-center md:items-start lg:items-center justify-between px-10 md:px-16 py-8 md:py-12 bg-white w-full min-h-[90vh]">
      < div className="flex-1 flex flex-col items-start justify-center max-w-xl">
        <h1 className="text-4xl md:text-5xl lg:!text-6xl mt-12 font-extrabold text-primary leading-normal">
         Hostel Admin - <br/><span className='md:text-5xl text-4xl text-gray-600 md:pt-4 pt-2 !leading-6'>Manage and grow your hostel business</span>
        </h1>
        <p className="text-lg mt-8 md:text-xl font-semibold !text-gray-500 !leading-8">
          {domainConfig.appDescription}
        </p>
  
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/signup">
          <Button label="Get started" className="btn btn-primary text-base font-bold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            Get started
          </Button>
          </Link>
          <Link href="/signup">
          <button className="btn btn-ghost text-base font-semibold flex items-center gap-2 hover:bg-cyan-50 rounded-lg px-4 py-3 transition-colors">
            Learn More <span className="text-xl"><FaArrowRightLong /></span>
          </button>
          </Link>
        </div>

        <div className='mt-12'>
        <Link href="https://hostelpilot.com" target="_blank" className="inline-block text-primary font-bold px-4 py-2 text-lg border-b border-primary ">
          Linked With <span className='text-blue'>Hostelpilot.com</span>
        </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center mt-10 md:mt-0 relative h-[300px] md:h-auto w-full">
        <div className="relative w-full max-w-md aspect-square">
          <Image
            src="/hero.png"
            alt="Hotel Management System Hero"
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </header>
  );
}

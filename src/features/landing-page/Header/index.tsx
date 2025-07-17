'use client';
import { SearchBox } from './SearchBox';
import { Suspense } from 'react';
import Image from 'next/image';
import { FeaturedHostel } from 'src/features/featured/featuredHostel';
import { MapProvider } from 'src/features/MapProvider';
import LandingPageOffers from '../offers';


export const Header = () => {
  return (
    <div className="dark:bg-white rounded-2xl bg-white flex min-h-screen xl:min-h-[calc(100vh-80px)] w-full flex-col items-center p-2 pb-0">
      <div className=" hero relative h-fit w-[100vw] bg-cover bg-center xl:min-h-[calc(100vh-80px)] xl:w-full rounded-2xl">
        <Image src={'/images/hostel_bg.jpg'} fill alt="" className="object-cover rounded-2xl" />
        <div className="hero-overlay z-10 min-h-[50vh] bg-opacity-50 pb-28 lg:pb-0 rounded-2xl">
          <div className=" inset-0 flex w-full flex-col items-center justify-center px-4 text-center">
            <div className='bg-slate-100 w-[95%] lg:w-[80%] mt-40 md:mt-60 p-4 rounded-xl leading-3'>
              <h1 className=" mb-4 mt-8 text-4xl font-bold text-primary md:text-5xl md:mb-1">
                Find the perfect hostel to call home with Us!
              </h1>
              <p className="mb-8 text-sm text-gray-700 lg:text-base tracking-wide">
                Search for your ideal hostel here at Hostelpilot.com - Fast and Easy.
              </p>
            
              <div className="flex mb-4 w-full items-center justify-center align-middle ">
                <Suspense>
                  <MapProvider>
                    <SearchBox />
                  </MapProvider>
                </Suspense>
              </div>
              {/* <div className="grid grid-cols-3 gap-4 text-center w-[80%] lg:w-[40%] mx-auto">
                <div className="flex flex-col items-center border-r border-gray-300">
                  <div className="text-2xl md:text-4xl font-bold text-secondary/90 mb-1">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-600">Hostels</div>
                </div>
                <div className="flex flex-col items-center border-r border-gray-300">
                  <div className="text-2xl md:text-4xl font-bold text-secondary/90 mb-1">5+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-600">Cities</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl md:text-4xl font-bold text-secondary/90 mb-1">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-600">Support</div>
                </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 w-full bg-slate-50 p-4">
        <FeaturedHostel />
      </div>
      <div className="mx-4 w-full bg-slate-50 p-4">
        <LandingPageOffers />
      </div>
      <div />
    </div>
  );
};

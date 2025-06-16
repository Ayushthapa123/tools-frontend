'use client';
import { SearchBox } from './SearchBox';
import { Suspense } from 'react';
import Image from 'next/image';
import { FeaturedHostel } from 'src/features/featured/featuredHostel';
import { MapProvider } from 'src/features/MapProvider';
interface LocationOption {
  id: number;
  name: string;
}

export const Header = () => {
  return (
    <div className="dark:bg-default-300 bg-primary-100 flex min-h-screen w-full flex-col items-center">
      <div className=" hero relative h-fit w-[100vw] bg-cover bg-center xl:min-h-[calc(100vh-70px)] xl:w-full">
        <Image src={'/images/hostel_bg.jpg'} fill alt="" className="object-cover" />
        <div className="hero-overlay z-10 min-h-[50vh] bg-opacity-50 pb-28 lg:pb-0">
          <div className=" inset-0 flex w-full flex-col items-center justify-center px-4 text-center">
            <div className='bg-slate-100 w-[80%] mt-40 md:mt-32 p-4 rounded-xl leading-3'>
              <h1 className=" mb-4 mt-8 text-4xl font-bold text-primary md:text-4xl md:mb-1">
                Find the perfect hostel to call home with Us!
              </h1>
              <p className="mb-8 text-base text-gray-700 lg:text-base tracking-wide">
                Search for your ideal hostel here at Hostelpilot.com - Fast and Easy.
              </p>

            
              <div className="flex mb-4 w-full items-center justify-center">
                <Suspense>
                  <MapProvider>
                    <SearchBox />
                  </MapProvider>
                </Suspense>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center w-[40%] mx-auto">
                <div className="flex flex-col items-center border-r border-gray-300">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Hostels</div>
                  <div className="text-2xl md:text-2xl font-bold text-secondary mb-1">10+</div>
                </div>
                <div className="flex flex-col items-center border-r border-gray-300">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cities</div>
                  <div className="text-2xl md:text-2xl font-bold text-secondary mb-1">5+</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                  <div className="text-2xl md:text-2xl font-bold text-secondary mb-1">24/7</div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 w-full bg-slate-50 p-4">
        <FeaturedHostel />
      </div>
      <div />
    </div>
  );
};

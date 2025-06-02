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
        <Image src={'/background-image.png'} fill alt="" className="object-cover" />
        <div className=" hero-overlay z-10 min-h-[50vh] bg-opacity-60 pb-28 lg:pb-0">
          <div className=" inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className=" mb-4 mt-40 text-4xl font-bold text-white md:mt-80 md:text-5xl">
            Your Hostel Search, Simplified -
            Explore with Us!
            </h1>
            <p className="mb-8 text-base text-white lg:text-lg">
            Welcome to Hostelpilot.com, your go-to platform for finding the perfect hostel. Whether it is a cozy stay or a shared space, we make your search quick and easy!
            </p>
            <div className="">
              <Suspense>
                <MapProvider>
                  <SearchBox />
                </MapProvider>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 w-full bg-white p-4">
        <FeaturedHostel />
      </div>
      <div />
    </div>
  );
};

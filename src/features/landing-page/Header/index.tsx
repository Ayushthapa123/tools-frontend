'use client';
import { SearchBox } from './SearchBox';
import { Suspense } from 'react';
import Image from 'next/image';
interface LocationOption {
  id: number;
  name: string;
}

export const Header = () => {
  return (
    <div className="dark:bg-default-300 bg-primary-100 flex min-h-screen w-full flex-col items-center">
      <div
        className=" hero min-h-screen w-full bg-cover bg-center relative"
      >
        <Image src={'/background-image.png'} fill alt=''/>
        <div className=" hero-overlay min-h-[50vh] bg-opacity-60 z-10 ">
          <div className=" inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className=" mb-4 mt-80 text-4xl font-bold text-white md:text-5xl">
              Find Your Next Homestay
            </h1>
            <p className="mb-8 text-lg text-white">
              Get the best prices on 200,000+ properties, in Nepal
            </p>
            <div className="">
              <Suspense>
                <SearchBox />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
};

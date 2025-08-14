'use client';
import { SearchBox } from './SearchBox';
import { Suspense } from 'react';
import Image from 'next/image';
import { FeaturedHostel } from 'src/features/featured/featuredHostel';
import { MapProvider } from 'src/features/MapProvider';
import LandingPageOffers from '../offers';
import Link from 'next/link';

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
     
      <div className="mx-4 w-full bg-slate-50 p-4 my-10 mt-16">
        <LandingPageOffers />
      </div>
      <div className="text-center font-bold">
        <h2 className="md:text-4xl ">Your Backpacking Journey Starts Here</h2>
      </div>
      <div className="flex justify-center my-12 w-full">
        <Link
          href="/tools/travel-destination-finder"
          className="group block w-full max-w-6xl bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 rounded-2xl shadow-xl p-8  cursor-pointer border border-blue-100 hover:shadow-2xl"
        >
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 bg-white/30 rounded-full p-4 shadow-md group-hover:scale-105 transition-transform">
              <svg
                className="w-10 h-10 text-blue-700  group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M8 10h8M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold mb-2 group-hover:underline  transition-colors">
                Travel Destination Finder
              </h3>
              <p className="text-lg  ">
                Find the best travel destination for your next trip, based on your preferences, budget, and interests.
              </p>
              <span className="inline-block mt-3 px-4 py-1 bg-white/20 rounded-full text-sm font-semibold tracking-wide text-blue-100 group-hover:bg-yellow-400 group-hover:text-blue-800 transition-colors">
                Free & Easy to Use
              </span>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex justify-center my-12 w-full">
        <Link
          href="/tools/travel-budget-calculator"
          className="group block w-full max-w-6xl bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 rounded-2xl shadow-xl p-8  cursor-pointer border border-blue-100 hover:shadow-2xl"
        >
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 bg-white/30 rounded-full p-4 shadow-md group-hover:scale-105 transition-transform">
              <svg
                className="w-10 h-10 text-blue-700  group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M8 10h8M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold mb-2 group-hover:underline  transition-colors">
                Travel Budget Calculator
              </h3>
              <p className="text-lg  ">
                Plan your next adventure with confidence! Instantly estimate your total and daily travel expenses, receive a personalized travel guide, and make your journey stress-free and budget-friendly.
              </p>
              <span className="inline-block mt-3 px-4 py-1 bg-white/20 rounded-full text-sm font-semibold tracking-wide text-blue-100 group-hover:bg-yellow-400 group-hover:text-blue-800 transition-colors">
                Free & Easy to Use
              </span>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex justify-center my-12 w-full">
        <Link
          href="/tools/checklist-for-travelling"
          className="group block w-full max-w-6xl bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 rounded-2xl shadow-xl p-8  cursor-pointer border border-blue-100 hover:shadow-2xl"
        >
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 bg-white/30 rounded-full p-4 shadow-md group-hover:scale-105 transition-transform">
              <svg
                className="w-10 h-10 text-blue-700  group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M8 10h8M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold mb-2 group-hover:underline  transition-colors">
                Travel Checklist Generator
              </h3>
              <p className="text-lg  ">
                Generate a travel checklist for your next trip, based on your destination, budget, and interests.
              </p>
              <span className="inline-block mt-3 px-4 py-1 bg-white/20 rounded-full text-sm font-semibold tracking-wide text-blue-100 group-hover:bg-yellow-400 group-hover:text-blue-800 transition-colors">
                Free & Easy to Use
              </span>
            </div>
          </div>
        </Link>
      </div>
      <div className="mx-4 w-full bg-slate-50 p-4">
        <FeaturedHostel />
      </div>
    
      <div />
    </div>
  );
};

'use client';
import React, { useState } from 'react';

import { BiSearch } from 'react-icons/bi';
import { SearchSuggestions } from './SearchSuggestions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from 'src/components/Input';

export const SearchBox = () => {
  const params = useSearchParams();
  const checkinDateFromParams = params.get('checkInDate');
  const checkoutDateFromParams = params.get('checkOutDate');
  const [checkInDate, setCheckInDate] = useState(
    checkinDateFromParams ?? new Date().toISOString().split('T')[0],
  );
  const [checkOutDate, setCheckOutDate] = useState(
    checkoutDateFromParams ??
      new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
  ); // must me greater than checkInDate

  const path = usePathname();
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const [city, setCity] = useState(params.get('city') ?? '');
  const [subCity, setSubCity] = useState(params.get('subCity') ?? '');
  const [country, setCountry] = useState(params.get('country') ?? '');
  const [query, setQuery] = useState(params.get('query') ?? '');
  const router = useRouter();

  const handleCountry = (country: string) => {
    setCountry(country);
  };
  const handleCity = (city: string) => {
    setCity(city);
  };
  const handleSubCity = (city: string) => {
    setSubCity(city);
  };
  const handleQuery = (q: string) => {
    setQuery(q);
  };

  const handleClose = () => {
    setShowSearchSuggestions(false);
  };

  // const handleSearch = () => {
  //   if (!city) {
  //     return;
  //   }

  //   router.push(`/search?country=${country}&city=${city}&subCity=${subCity}&query=${query}`);
  //   setTimeout(() => {
  //     if (path.includes('search')) {
  //       window.location.reload();
  //     }
  //   }, 100);
  // };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    if (country) searchParams.set('country', country);
    if (city) searchParams.set('city', city);
    if (subCity) searchParams.set('subCity', subCity);
    if (query) searchParams.set('query', query);
    if (checkInDate) searchParams.set('checkInDate', checkInDate);
    if (checkOutDate) searchParams.set('checkOutDate', checkOutDate);

    if (!city && !query) {
      router.push(`/search?${searchParams.toString()}`);

      // router.push(`/search`);
    } else {
      router.push(`/search?${searchParams.toString()}`);
    }

    setTimeout(() => {
      if (path.includes('search')) {
        window.location.reload();
      }
    }, 100);
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center px-3 ">
      <div className="relative z-50 flex w-full max-w-6xl flex-col gap-2  space-y-[6px] rounded-2xl border bg-gray-50 px-[10px] py-[10px] focus-within:border-gray-300 sm:flex-row sm:space-y-0 sm:rounded-full sm:pl-6">
        <input
          type="text"
          placeholder="Search By Location"
          autoComplete="off"
          className="w-full border-0 bg-transparent px-0 py-2 pr-4 font-semibold focus:outline-none focus:ring-0"
          name="query"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onClick={() => setShowSearchSuggestions(true)}
        />

        <div className=" flex ">
          <label className="relative mb-1 mt-4 block whitespace-nowrap text-sm font-medium text-primary">
            Check In:
          </label>

          <Input
            type="date"
            className="w-full rounded-xl  border-gray-300 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={checkInDate}
            onChange={e => setCheckInDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className=" flex ">
          <label className="relative mb-1 mt-4 block whitespace-nowrap text-sm font-medium text-primary">
            Check-Out:
          </label>
          <Input
            type="date"
            className="w-full rounded-xl  border-gray-300 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={checkOutDate}
            onChange={e => setCheckOutDate(e.target.value)}
            min={checkInDate}
          />
        </div>

        <button
          className="flex flex-row items-center justify-center rounded-full border border-transparent bg-secondary px-3 py-2 text-base font-medium tracking-wide text-white transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 md:min-w-[130px] md:px-8"
          onClick={() => handleSearch()}>
          <span className="block sm:hidden md:block">Search</span>
          <span className="hidden text-xl sm:flex  md:hidden">
            <BiSearch />
          </span>
        </button>
      </div>
      <div className="flex w-full max-w-6xl justify-start px-0 py-2 sm:pl-6">
        {showSearchSuggestions && (
          <SearchSuggestions
            handleClose={handleClose}
            handleCity={handleCity}
            handleSubCity={handleSubCity}
            handleCountry={handleCountry}
            handleQuery={handleQuery}
            query={query}
          />
        )}
      </div>
    </div>
  );
};

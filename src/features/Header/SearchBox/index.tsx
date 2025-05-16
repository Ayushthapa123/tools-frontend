'use client';
import React, { useState } from 'react';

import { BiSearch } from 'react-icons/bi';
import { SearchSuggestions } from './SearchSuggestions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const SearchBox = () => {
  const params = useSearchParams();

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

  const handleSearch = () => {
    if (!city) {
      return;
    }

    router.push(
      `/search?country=${country}&city=${city}&subCity=${subCity}&query=${query}`,
    );
    setTimeout(() => {
      if (path.includes('search')) {
        window.location.reload();
      }
    }, 100);
  };
  return (
    <div className="relative flex flex-col justify-center items-center w-full px-3 ">
      <div className="relative z-50 flex space-y-[6px] sm:space-y-0 flex-col sm:flex-row  w-full max-w-6xl rounded-2xl sm:rounded-full border bg-gray-50 px-[10px] sm:pl-6 py-[10px] focus-within:border-gray-300">
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
     
     
        <button
          className="flex  flex-row items-center justify-center rounded-full border border-transparent px-3 py-2 text-base font-medium tracking-wide text-white transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 md:min-w-[130px] md:px-8"
          onClick={() => handleSearch()}>
          <span className="block sm:hidden md:block">Search button</span>
          <span className="hidden sm:flex text-xl  md:hidden">
            <BiSearch />
          </span>
        </button>
      </div>
      <div className=" flex w-full justify-start px-0 sm:pl-6  max-w-6xl py-2">
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

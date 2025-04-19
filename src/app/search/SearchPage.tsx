'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { MdApartment } from 'react-icons/md';
import Footer from 'src/features/Footer';
// import { SearchBox } from 'src/features/Header/SearchBox';
import { SearchResults } from './SearchResults';
import { SearchBox } from 'src/features/landing-page/Header/SearchBox';

export function SearchPage() {
  const params = useSearchParams();

  const checkInDate = params.get('checkInDate') ?? '';
  const checkOutDate = params.get('checkOutDate') ?? '';

  const [hostelType, setHostelType] = useState(params.get('hostelType') ?? '');
  const [genderType, setGenderType] = useState(params.get('genderType') ?? '');
  const [city, setCity] = useState(params.get('city') ?? '');
  const [subCity, setSubCity] = useState(params.get('subCity') ?? '');
  const [country, setCountry] = useState(params.get('country') ?? '');
  const [query, setQuery] = useState(params.get('query') ?? '');
  const [count, setCount] = useState(0);

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

  const handleCount = (count: number) => {
    setCount(count);
  };
  return (
    <div className="w-full ">
      <div className="mx-auto mt-4 h-full max-w-[1800px] bg-white py-3 ">
        <Suspense>
          <SearchBox />
        </Suspense>

        <div className="flex border-b p-10 py-5 ">
          <div className="flex-grow ">
            <h2 className="flex text-4xl capitalize text-primary">
              <span>
                <MdApartment />
              </span>
              {subCity ? `${subCity}` : ''} {city}, {country}
            </h2>
            <p className="">{count} Homestays Found!</p>
          </div>
        </div>
        <div className=" relative flex h-[73vh]  w-full overflow-y-hidden">
          <div className="relative grid h-[75vh] flex-grow gap-3 overflow-y-scroll p-5">
            <SearchResults
              city={city}
              subCity={subCity}
              country={country}
              genderType={genderType}
              hostelType={hostelType}
              handleCount={handleCount}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

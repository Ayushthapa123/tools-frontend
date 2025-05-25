'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { MdApartment } from 'react-icons/md';
// import { SearchBox } from 'src/features/Header/SearchBox';
import { SearchResults } from './SearchResults';
import { SearchBox } from 'src/features/landing-page/Header/SearchBox';
import { MapProvider } from 'src/features/MapProvider';
export function SearchPage() {
  const params = useSearchParams();

  const checkInDate = params.get('checkInDate') ?? '';
  const checkOutDate = params.get('checkOutDate') ?? '';

  const [genderType, setGenderType] = useState(params.get('genderType') ?? '');
  const [city, setCity] = useState(params.get('city') ?? '');
  const [subCity, setSubCity] = useState(params.get('subCity') ?? '');
  const [country, setCountry] = useState(params.get('country') ?? '');
  const [lat, setLat] = useState(params.get('lat') ?? '');
  const [lng, setLng] = useState(params.get('lng') ?? '');
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
    <div className=" ">
      <div className="mx-auto mt-4 h-full max-w-[1800px] pt-3 min-h-10">
        <div className='lg:min-w-[400px] mx-auto flex items-center justify-center'>
          <Suspense>
            <MapProvider><SearchBox /></MapProvider>
          </Suspense>
        </div>

        <div className="flex border-b p-10 py-5 ">
          <div className="flex-grow flex items-center justify-between">
            <h2 className="flex text-4xl capitalize text-primary">
              <span>
                <MdApartment />
              </span>
              {subCity ? `${subCity}` : ''} {city ? city + ",":""} {country}
            </h2>
            <p className=""> <span className='text-secondary/80'>{count} Hostels Found!</span></p>
          </div>
        </div>
        <div className=" relative flex h-auto  w-full overflow-y-hidden">
          <div className="relative grid h-auto flex-grow gap-3 p-5 w-[90vw] mx-auto">
            <SearchResults
              city={city}
              subCity={subCity}
              country={country}
              genderType={genderType}
              handleCount={handleCount}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              lat={Number(lat)}
              lng={Number(lng)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

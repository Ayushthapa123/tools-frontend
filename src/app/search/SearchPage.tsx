'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { MdApartment } from 'react-icons/md';
// import { SearchBox } from 'src/features/Header/SearchBox';
import { SearchResults } from './SearchResults';
import { SearchBox } from 'src/features/landing-page/Header/SearchBox';
import { MapProvider } from 'src/features/MapProvider';
import { number } from 'framer-motion';
export function SearchPage() {
  const params = useSearchParams();

  const checkInDate = params.get('checkInDate') ?? '';
  const checkOutDate = params.get('checkOutDate') ?? '';

  const [ genderType, setGenderType ] = useState(params.get('genderType') ?? '');
  const [ city, setCity ] = useState(params.get('city') ?? '');
  const [ subCity, setSubCity ] = useState(params.get('subCity') ?? '');
  const [ country, setCountry ] = useState(params.get('country') ?? '');
  const [ lat, setLat ] = useState(params.get('lat') ?? '');
  const [ lng, setLng ] = useState(params.get('lng') ?? '');
  const [ query, setQuery ] = useState(params.get('query') ?? '');
  const [ count, setCount ] = useState<number | undefined>(undefined);

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
  console.log("cc", count, typeof (count))
  return (
    <div className=" ">
      <div className="mx-auto mt-4 h-full min-h-10 max-w-[1800px] pt-3">
        <div className="mx-auto flex items-center justify-center lg:min-w-[400px]">
          <Suspense>
            <MapProvider>
              <SearchBox />
            </MapProvider>
          </Suspense>
        </div>

        <div className="flex border-b p-10 py-5">
            <span>
              <MdApartment className='text-3xl mr-1' />
            </span>
          <div className="flex flex-grow items-end">
            <p className='text-gray-500'>
              <span className="text-black text-3xl">{count}</span> Hostels Found nearby
            </p>
            <h2 className="flex items-end gap-3 text-xl capitalize text-secondary ml-1">
              {query ? query : ""}
              {subCity ? subCity : ''} {city ? city + ',' : ''} {country}
            </h2>
          </div>
        </div>
        <div className=" relative flex h-auto  w-full overflow-y-hidden">
          <div className="relative mx-auto grid h-auto w-[90vw] flex-grow gap-3 p-5">
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

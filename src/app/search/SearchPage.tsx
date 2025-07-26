'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { MdApartment } from 'react-icons/md';
import { SearchResults } from './SearchResults';
import { SearchBox } from 'src/features/landing-page/Header/SearchBox';
import { MapProvider } from 'src/features/MapProvider';
import SearchFilter from './filter';
import Button from 'src/components/Button';
import { DetailViewModal } from 'src/app/hostel/room-details/RoomDetailView';
import CustomSearchFormCard from './cards/CustomSearchFormCard';
import { HostelGenderType, HostelType, RoomCapacity } from 'src/gql/graphql';

export function SearchPage() {
  const params = useSearchParams();

  const checkInDate = params.get('checkInDate') ?? '';
  const checkOutDate = params.get('checkOutDate') ?? '';

  const [genderType, setGenderType] = useState(params.get('genderType') ?? null);
  const [city, setCity] = useState(params.get('city') ?? '');
  const [subCity, setSubCity] = useState(params.get('subCity') ?? '');
  const [country, setCountry] = useState(params.get('country') ?? '');
  const [lat, setLat] = useState(params.get('lat') ?? '');
  const [lng, setLng] = useState(params.get('lng') ?? '');
  const [query, setQuery] = useState(params.get('query') ?? '');
  const [count, setCount] = useState<number | undefined>(undefined);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [filteredHostels, setFilteredHostels] = useState<any>(null);
  const [hostelType, setHostelType] = useState(params.get('hostelType') ?? null);
  const [roomCapacity, setRoomCapacity] = useState(params.get('roomCapacity') ?? null);

  useEffect(() => {
    if (showMobileFilter) {
      setShowMobileFilter(false);
    }
  }, [filteredHostels]);

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
    <div className="min-h-screen">
      <div className="mx-auto mt-4 h-full min-h-10 max-w-[1800px] pt-3">
        <div className="mx-auto flex items-center justify-center lg:min-w-[400px]">
          <Suspense>
            <MapProvider>
              <SearchBox />
            </MapProvider>
          </Suspense>
        </div>

        <div className="ml-6 flex items-center justify-between lg:ml-4">
          <div className="flex py-5">
            <span>
              <MdApartment className="mr-1 text-3xl" />
            </span>
            <div className="flex flex-col gap-1 md:flex-row md:gap-2">
              <p className="text-gray-500">
                <span className="text-3xl text-black">{count}</span> Hostels Found nearby
              </p>
              <h2 className="ml-1 flex items-end gap-3 text-xl capitalize text-secondary">
                {query ? query : ''}
                {subCity ? subCity : ''} {city ? city + ',' : ''} {country}
              </h2>
            </div>
          </div>
          <div className="mr-4 block md:hidden">
            <Button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              label="Filter"
              className="h-6"
            />
          </div>
        </div>

        <div className="sticky top-0 flex w-full">
          <div className="relative mx-4 hidden min-h-screen w-[25%] md:block">
            <div className="">
              <SearchFilter
                setFilteredHostels={setFilteredHostels}
                lat={Number(lat)}
                lng={Number(lng)}
                genderType={genderType as HostelGenderType}
                hostelType={hostelType as HostelType}
                roomCapacity={roomCapacity as RoomCapacity}
                isLoading={false}
                setHostelType={setHostelType}
                setGenderType={setGenderType}
                setRoomCapacity={setRoomCapacity} 
                
              />
            </div>
          </div>
          <div className="relative mx-auto grid w-[70%] flex-grow gap-3 p-5 pt-0">
            <SearchResults
              city={city}
              subCity={subCity}
              country={country}
              genderType={genderType as HostelGenderType}
              hostelType={hostelType as HostelType}
              roomCapacity={roomCapacity as RoomCapacity}
              handleCount={handleCount}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              lat={Number(lat)}
              lng={Number(lng)}
            />
            <div className="mt-4 w-full">
              <CustomSearchFormCard />
            </div>
          </div>
        </div>
      </div>
      {showMobileFilter && (
        <DetailViewModal open={showMobileFilter} handleClose={() => setShowMobileFilter(false)}>
          <SearchFilter
            setFilteredHostels={setFilteredHostels}
            lat={Number(lat)}
            lng={Number(lng)}
            genderType={genderType as HostelGenderType}
            hostelType={hostelType as HostelType}
            roomCapacity={roomCapacity as RoomCapacity}
            isLoading={false}
            setHostelType={setHostelType}
            setGenderType={setGenderType}
            setRoomCapacity={setRoomCapacity}
          />
        </DetailViewModal>
      )}
    </div>
  );
}

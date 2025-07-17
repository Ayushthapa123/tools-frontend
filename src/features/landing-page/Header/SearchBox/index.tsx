'use client';
import React, { useRef, useState } from 'react';
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';

import { BiSearch } from 'react-icons/bi';
import { SearchSuggestions } from './SearchSuggestions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaLocationDot } from 'react-icons/fa6';
import { FaBuilding } from 'react-icons/fa';
import { Select } from 'src/components/Select';
import { Gender, RoomCapacity } from 'src/gql/graphql';

const radiusOptions = [
  { label: '500m', value: '500' },
  { label: '1km', value: '1000' },
  { label: '2km', value: '2000' },
  { label: '3km', value: '3000' },
  { label: '4km', value: '4000' },
  { label: '5km', value: '5000' },
];
const genderOptions = [
  { label: 'Boys', value: Gender.Boys },
  { label: 'Girls', value: Gender.Girls },
  { label: 'Both', value: Gender.Others },
];
const roomTypeOptions = [
  { label: 'Single', value: RoomCapacity.OneBed },
  { label: 'Double', value: RoomCapacity.TwoBed },
  { label: 'Triple', value: RoomCapacity.ThreeBed },
  { label: 'Quad', value: RoomCapacity.FourBed },
  { label: 'Suite', value: RoomCapacity.FiveBed },
  { label: 'Multi Bed', value: RoomCapacity.MultiBed },
];

const priceRangeOptions = [
  { label: 'Around 9000/M', value: '9000' },

  { label: 'Around 10000/M', value: '10000' },
  { label: 'Around 11000/M', value: '11000' },
  { label: 'Around 12000/M', value: '12000' },
  { label: 'Around 13000/M', value: '13000' },
  { label: 'Around 14000/M', value: '14000' },
  { label: 'Around 15000/M', value: '15000' },
  { label: 'Around 16000/M', value: '16000' },
  { label: 'Around 17000/M', value: '17000' },
  { label: 'Around 18000/M', value: '18000' },
  { label: 'Around 19000/M', value: '19000' },
];
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
  const [searchText, setSearchText] = useState<string | number | readonly string[] | undefined>();
  const [searchHostelNameText, setSearchHostelNameText] = useState<
    string | number | readonly string[] | undefined
  >();
  const router = useRouter();

  const [clickedLatLng, setClickedLatLng] = useState<{
    lat: number | null;
    lng: number | null;
  } | null>(null);

  const [selectedRadius, setSelectedRadius] = useState(params.get('radius') ?? '');
  const [selectedGender, setSelectedGender] = useState(params.get('gender') ?? '');
  const [selectedRoomType, setSelectedRoomType] = useState(params.get('roomType') ?? '');
  const [selectedPriceRange, setSelectedPriceRange] = useState(params.get('priceRange') ?? '');
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
    if (!isValidSearch) return;
    const searchParams = new URLSearchParams();

    if (country) searchParams.set('country', country);
    if (city) searchParams.set('city', city);
    if (subCity) searchParams.set('subCity', subCity);
    if (query) searchParams.set('query', query);
    // if (checkInDate) searchParams.set('checkInDate', checkInDate);
    // if (checkOutDate) searchParams.set('checkOutDate', checkOutDate);
    if (clickedLatLng) searchParams.set('lat', clickedLatLng.lat?.toString() ?? '');
    if (clickedLatLng) searchParams.set('lng', clickedLatLng.lng?.toString() ?? '');
    if (selectedRadius) searchParams.set('radius', selectedRadius);
    if (selectedGender) searchParams.set('gender', selectedGender);
    if (selectedRoomType) searchParams.set('roomType', selectedRoomType);
    if (selectedPriceRange) searchParams.set('priceRange', selectedPriceRange);
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

  const autocompleteRef1 = useRef<any>(null);
  const autocompleteRef2 = useRef<any>(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef1.current.getPlace();
    handleQuery(place?.name ?? '');
    if (place?.geometry && place?.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setClickedLatLng({ lat, lng });
      setSearchText(place?.name);
      setQuery(place?.name);
    }
  };

  const handleHostelNameChanged = () => {
    const place = autocompleteRef2.current.getPlace();
    handleQuery(place?.name ?? '');
    if (place?.geometry && place?.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setClickedLatLng({ lat, lng });
      setSearchHostelNameText(place?.name);
      setQuery(place?.name);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchHostelNameText) {
      setSearchHostelNameText('');
    }
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9 ,\-]/, '');
    setSearchText(sanitizedValue);
  };
  const handleHostelNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchText) {
      setSearchText('');
    }
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9 ,\-]/, '');
    setSearchHostelNameText(sanitizedValue);
  };
  const isValidSearch =
    clickedLatLng?.lat || clickedLatLng?.lng || query || searchText || searchHostelNameText;

  const isMainPage = path === '/';

  return (
    <div className="relative flex w-full flex-col items-center justify-center px-3 ">
      <div className="relative z-50 flex w-full max-w-6xl flex-col gap-2 space-y-[6px]  rounded-md border bg-gray-50 px-[10px] py-[10px] focus-within:border-gray-300 sm:flex-row sm:space-y-0 sm:rounded-md sm:py-1 sm:pr-1  md:min-w-[600px]">
        <div className="flex w-full flex-grow items-start gap-3 border-r-gray-300 p-2 md:border-r">
          <div>
            <FaLocationDot className="h-6 w-6" />
          </div>
          <div className="flex w-full flex-col items-start justify-start">
            <span>Location</span>
            <Autocomplete
              onLoad={autocomplete => (autocompleteRef1.current = autocomplete)}
              className="w-full "
              onPlaceChanged={handlePlaceChanged}>
              <input
                type="text"
                placeholder="Search Your Location"
                value={searchText}
                className="w-full rounded-md bg-gray-50 p-2  pl-0 text-base placeholder:text-xs "
                onChange={handleLocationChange}
                defaultValue={query}
                // autoComplete="on"
                // required
              />
            </Autocomplete>
          </div>
        </div>
        <div className="flex w-full flex-grow items-start gap-3 p-2">
          <div>
            <FaBuilding className="h-6 w-6" />
          </div>
          <div className="flex w-full flex-col items-start justify-start">
            <span>Hostel Name</span>
            <Autocomplete
              onLoad={autocomplete => (autocompleteRef2.current = autocomplete)}
              className=" w-full"
              onPlaceChanged={handleHostelNameChanged}>
              <input
                type="text"
                placeholder="Enter hostel's name"
                value={searchHostelNameText}
                className="w-full rounded-md bg-gray-50 p-2  pl-0 text-base placeholder:text-xs"
                onChange={handleHostelNameChange}
                // defaultValue={query}
                // required
              />
            </Autocomplete>
          </div>
        </div>

        <div className="mr-3 flex w-full flex-row items-center justify-center gap-2 md:w-fit">
          <button
            className={`flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-primary px-3 py-2 text-base font-medium tracking-wide text-white transition duration-150 ease-in-out md:min-h-[40px] md:w-fit md:min-w-[100px] ${!isValidSearch ? 'cursor-not-allowed' : ''}`}
            onClick={() => handleSearch()}>
            <span className="hidden text-xl sm:flex">
              <BiSearch />
            </span>
            <span className="block sm:hidden md:block">Search</span>
          </button>
        </div>
      </div>
      <div className=" w-full max-w-6xl md:min-w-[600px] ">
        <div
          className={` flex min-w-[300px] flex-row gap-2 md:gap-5 ${isMainPage ? '' : 'hidden'}`}>
            <div>
          <Select
            label="Distance"
            options={radiusOptions}
            title="Radius"
            className=" "
            value={selectedRadius}
            onChange={e => setSelectedRadius(e.target.value)}
          />
          </div>
          <div>
          <Select
            label="Gender"
            options={genderOptions}
            title="Gender"
            className=""
            value={selectedGender}
              onChange={e => setSelectedGender(e.target.value)}
            />
          </div>
          <div>
            <Select
              label="Room Type"
              options={roomTypeOptions}
              title="Room Type"
              className=""
              value={selectedRoomType}
              onChange={e => setSelectedRoomType(e.target.value)}
            />
          </div>
          <div className=" hidden md:block relative">
            <Select
              label="Price Range"
              options={priceRangeOptions}
              title="Price Range"
              className=""
              value={selectedPriceRange}
              onChange={e => setSelectedPriceRange(e.target.value)}
            />
          </div>
        </div>
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

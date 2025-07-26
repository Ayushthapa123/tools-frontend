import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IoCloseSharp, IoFilterSharp } from 'react-icons/io5';
import { Select } from 'src/components/Select';
import RangeSlider from 'src/components/RangeSlider';
import { HostelType, HostelGenderType, RoomCapacity } from 'src/gql/graphql';



export default function SearchFilter({
  setFilteredHostels,
  lat,
  lng,
  isLoading,
  setHostelType,
  setGenderType,
  setRoomCapacity,
  hostelType,
  genderType,
  roomCapacity,
}: {
  setFilteredHostels: (filteredHostel: any) => void;
  lat: number;
  lng: number;
  isLoading: boolean;
  setHostelType: (hostelType: HostelType) => void;
  setGenderType: (genderType: HostelGenderType) => void;
  setRoomCapacity: (roomCapacity: RoomCapacity) => void;
  hostelType: HostelType;
  genderType: HostelGenderType;
  roomCapacity: RoomCapacity;
}) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [monthlyPriceRange, setMonthlyPriceRange] = useState<[number, number]>([0, 20000]);

  const roomSeater = [
    {
      label: 'All',
      value: null,
    },
    {
      label: 'One Seater',
      value: RoomCapacity.OneBed,
    },
    {
      label: 'Two Seater',
      value: RoomCapacity.TwoBed,
    },
    {
      label: 'Three Seater',
      value: RoomCapacity.ThreeBed,
    },
    {
      label: 'Four Seater',
      value: RoomCapacity.FourBed,
    },
    {
      label: 'Five Seater',
      value: RoomCapacity.FiveBed,
    },
    // {
    //   label: 'Six Seater',
    //   value: RoomCapacity.SixBed,
    // },
    // {
    //   label: 'Seven Seater',
    //   value: RoomCapacity.SevenBed,
    // },
    // {
    //   label: 'Eight Seater',
    //   value: RoomCapacity.EightBed,
    // },
  ];

  const hostelTypeOptions = [
    {
      label: 'All',
      value: null,
    },
    {
      label: 'Stay',
      value: HostelType.Stay,
    },
    {
      label: 'PG',
      value: HostelType.Pg,
    },
    {
      label: 'Travel',
      value: HostelType.Travel,
    },
    {
      label: 'Both',
      value: HostelType.Both,
    },
  ];

  const hostelGenderOptions = [
    {
      label: 'All',
      value: null,
    },
    {
      label: 'Boys',
      value: HostelGenderType.Boys,
    },
    {
      label: 'Girls',
      value: HostelGenderType.Girls,
    },
    {
      label: 'Both',
      value: HostelGenderType.Both,
    },
  ];

 

  const queryClient = useQueryClient();

  const handleSubmitFilter = () => {
    setShouldFetch(true);
    // queryClient.invalidateQueries({ queryKey: ['getHostelsss'] });
    // force to refetch the query with the above key 
    queryClient.refetchQueries({ queryKey: ['getHostelsss'] });
  };

  const handleClearFilter = () => {
    // refresh the page
    window.location.reload();
  };
  return (
    <div className="m-2 flex flex-col items-center justify-between gap-4 rounded-md border border-gray-100 bg-gray-100 p-4">
      <div className="flex w-full flex-col items-start gap-4">
        <div className="my-3 w-full">
          <RangeSlider
            label="Price per day"
            min={0}
            max={2000}
            step={100}
            value={priceRange}
            onChange={value => {
              setPriceRange(value);
              setShouldFetch(false);
            }}
            formatValue={value => `Nrs.${value.toLocaleString()}`}
          />
        </div>
        <div className="my-3 w-full">
          <RangeSlider
            label="Price per month"
            min={0}
            max={20000}
            step={500}
            value={monthlyPriceRange}
            onChange={value => {
              setMonthlyPriceRange(value);
              setShouldFetch(false);
            }}
            formatValue={value => `Nrs.${value.toLocaleString()}`}
          />
        </div>
        <div className="w-full">
          <Select
            options={roomSeater}
            label="Seater"
            onChange={e => {
              setShouldFetch(false);
            }}
            value={roomCapacity}
          />
        </div>
        <div className="w-full">
          <Select
            options={hostelTypeOptions}
            label="Hostel Type"
            onChange={e => {
              setHostelType(e.target.value as HostelType);
              setShouldFetch(false);
            }}
            value={hostelType}
          />
        </div>
        <div className="w-full">
          <Select
            options={hostelGenderOptions}
            label="Hostel Gender"
            onChange={e => {
              setGenderType(e.target.value as HostelGenderType);
              setShouldFetch(false);
            }}
            value={genderType}
          />
        </div>
      </div>
      <div className="flex w-full flex-row-reverse items-center justify-between gap-2 xl:items-end ">
        <button
          className="flex w-full min-w-[120px] items-end justify-center gap-2 rounded-md bg-green p-3 font-semibold text-white opacity-90 transition-all duration-100 hover:font-semibold hover:opacity-100 lg:min-w-[145px]  xl:w-fit"
          onClick={handleSubmitFilter}
          disabled={isLoading}>
          <IoFilterSharp className="hidden text-2xl lg:block" />
          <span className="px-2 text-sm lg:text-base">
            {isLoading ? 'Loading...' : 'Apply filters'}
          </span>
        </button>
        <button
          className="flex w-full min-w-[120px] items-center justify-center gap-2 rounded-md bg-red p-3 font-semibold text-white  opacity-90 transition-all duration-100 hover:opacity-100 lg:min-w-[145px]  xl:w-fit"
          onClick={handleClearFilter}>
          <IoCloseSharp className="hidden text-2xl lg:block" />
          <span className="px-2 text-sm lg:text-base">Clear filters</span>
        </button>
      </div>
    </div>
  );
}

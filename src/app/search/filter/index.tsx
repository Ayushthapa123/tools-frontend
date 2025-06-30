import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { IoCloseSharp, IoFilterSharp } from "react-icons/io5";
import Button from "src/components/Button";
import { Input } from "src/components/Input";
import { Select } from "src/components/Select";
import RangeSlider from "src/components/RangeSlider";
import { HostelType, HostelGenderType, GetFilteredHostels, GetFilteredHostelsQuery, GetFilteredHostelsQueryVariables } from "src/gql/graphql";
import { useGraphqlClientRequest } from "src/hooks/useGraphqlClientRequest";

export interface FilterData {
  pricePerDay?: number[] | null;
  pricePerMonth?: number[] | null;
  seater?: 'ONE_BED' | 'TWO_BED' | 'THREE_BED' | 'FOUR_BED' | 'FIVE_BED' | 'SIX_BED' | 'SEVEN_BED' | 'EIGHT_BED';
  hostelType?: HostelType;
  gender?: HostelGenderType;
}

export default function SearchFilter({ setFilteredHostels, lat, lng }: { setFilteredHostels: (filteredHostel: any) => void, lat: number, lng: number }) {
  const [ shouldFetch, setShouldFetch ] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [monthlyPriceRange, setMonthlyPriceRange] = useState<[number, number]>([0, 20000]);

  const [ filterData, setFilterData ] = useState<FilterData>({
    pricePerDay: [0, 2000],
    pricePerMonth: [0, 20000],
    hostelType: HostelType.Stay,
    seater: "ONE_BED",
    gender: HostelGenderType.Boys
  });


  const roomSeater = [
    {
      label: "One Seater",
      value: "ONE_BED"
    },
    {
      label: "Two Seater",
      value: "TWO_BED"
    },
    {
      label: "Three Seater",
      value: "THREE_BED"
    },
    {
      label: "Four Seater",
      value: "FOUR_BED"
    },
    {
      label: "Five Seater",
      value: "FIVE_BED"
    },
    {
      label: "Six Seater",
      value: "SIX_BED"
    },
    {
      label: "Seven Seater",
      value: "SEVEN_BED"
    },
    {
      label: "Eight Seater",
      value: "EIGHT_BED"
    },
  ]

  const hostelTypeOptions = [
    {
      label: "Stay",
      value: HostelType.Stay
    },
    {
      label: "PG",
      value: HostelType.Pg
    },
    {
      label: "Travel",
      value: HostelType.Travel
    },
    {
      label: "Both",
      value: HostelType.Both
    }
  ]

  const hostelGenderOptions = [
    {
      label: "Boys",
      value: HostelGenderType.Boys
    },
    {
      label: "Girls",
      value: HostelGenderType.Girls
    },
    {
      label: "Both",
      value: HostelGenderType.Both
    }
  ]

  // Filter hostels based on filterData
  const filterHostels = useGraphqlClientRequest<GetFilteredHostelsQuery, GetFilteredHostelsQueryVariables>(
    GetFilteredHostels.loc?.source?.body!,
  );

  const fetchFilteredData = async () => {
    try {
      
      const res = await filterHostels({
        input: {
          latitude: Number(lat),
          longitude: Number(lng),
          baseAmountPerDay: priceRange,
          baseAmountPerMonth: monthlyPriceRange,
          seater: filterData.seater,
          hostelType: filterData.hostelType,
          genderType: filterData.gender,
        },
      });
      
      return res.getFilteredHostels;
    } catch (error) {
      console.error('Error fetching filtered hostels:', error);
      throw error;
    }
  };

  const { data: filteredHostels, isLoading } = useQuery({
    queryKey: [ 'getFilteredHostels', filterData.hostelType,filterData.gender, filterData.seater, lat, lng ],
    queryFn: fetchFilteredData,
    enabled: !!shouldFetch,
  });

  // Watch for when filteredHostels data becomes available
  useEffect(() => {
    if (filteredHostels && shouldFetch) {
      setFilteredHostels(filteredHostels.data);
    }
  }, [ filteredHostels, shouldFetch, setFilteredHostels ]);

  const handleSubmitFilter = () => {
    setShouldFetch(true);
  }

  const handleClearFilter = () => {
    setFilterData({
      pricePerDay: null,
      pricePerMonth: null,
      hostelType: HostelType.Stay,
      seater: "ONE_BED",
      gender: HostelGenderType.Boys
    });
    setPriceRange([0, 2000]);
    setMonthlyPriceRange([0, 20000]);
    setFilteredHostels(null);
    setShouldFetch(false);
  }
  return (
    <div className="flex flex-col justify-between items-center gap-4 bg-transparent border border-gray-100 rounded-md m-2 p-2">
      <div className="flex flex-col gap-4 items-start w-full">
        <div className="w-full my-3">
          <RangeSlider
            label="Price per day"
            min={0}
            max={2000}
            step={100}
            value={priceRange}
            onChange={(value) => {
              setPriceRange(value);
              setFilterData({ ...filterData, pricePerDay: value });
              setShouldFetch(false);
            }}
            formatValue={(value) => `Nrs.${value.toLocaleString()}`}
          />
        </div>
        <div className="w-full my-3">
          <RangeSlider
            label="Price per month"
            min={0}
            max={20000}
            step={500}
            value={monthlyPriceRange}
            onChange={(value) => {
              setMonthlyPriceRange(value);
              setFilterData({ ...filterData, pricePerMonth: value });
              setShouldFetch(false);
            }}
            formatValue={(value) => `Nrs.${value.toLocaleString()}`}
          />
        </div>
        <div className="w-full">
          <Select
            options={roomSeater}
            label="Seater"
            onChange={(e) => {
              setFilterData({ ...filterData, seater: e.target.value as 'ONE_BED' | 'TWO_BED' | 'THREE_BED' | 'FOUR_BED' | 'FIVE_BED' | 'SIX_BED' | 'SEVEN_BED' | 'EIGHT_BED' });
              setShouldFetch(false);
            }}
            value={filterData.seater}
          />
        </div>
        <div className="w-full">
          <Select
            options={hostelTypeOptions}
            label="Hostel Type"
            onChange={(e) => {
              setFilterData({ ...filterData, hostelType: e.target.value as HostelType });
              setShouldFetch(false);
            }}
            value={filterData.hostelType}
          />
        </div>
        <div className="w-full">
          <Select
            options={hostelGenderOptions}
            label="Hostel Gender"
            onChange={(e) => {
              setFilterData({ ...filterData, gender: e.target.value as HostelGenderType });
              setShouldFetch(false);
            }}
            value={filterData.gender}
          />
        </div>
      </div>
      <div className="flex flex-row-reverse w-full items-center xl:items-end justify-between gap-2 ">
        <button
          className="min-w-[120px] lg:min-w-[145px] w-full xl:w-fit flex items-end gap-2 justify-center bg-green font-semibold opacity-90 hover:opacity-100 text-white p-3 transition-all duration-100 hover:font-semibold  rounded-md"
          onClick={handleSubmitFilter}
          disabled={isLoading}
        >
          <IoFilterSharp className="text-2xl hidden lg:block" />
          <span className="px-2 text-sm lg:text-base">{isLoading ? 'Loading...' : 'Apply filters'}</span>
        </button>
        <button
          className="min-w-[120px] lg:min-w-[145px] w-full xl:w-fit flex items-center justify-center gap-2 bg-red text-white p-3  font-semibold opacity-90 hover:opacity-100 transition-all duration-100  rounded-md"
          onClick={handleClearFilter}
        >
          <IoCloseSharp className="text-2xl hidden lg:block" />
          <span className="px-2 text-sm lg:text-base">Clear filters</span>
        </button>
      </div>
    </div>
  )
}

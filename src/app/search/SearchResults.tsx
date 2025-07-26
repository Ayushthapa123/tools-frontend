'use client';
import { HostelCard } from './cards/HostelCard';

import { useEffect, useMemo } from 'react';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { SearchHostel, SearchHostelQuery, SearchHostelQueryVariables, RoomCapacity, HostelType, HostelGenderType, HostelData, } from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { HostelCardSkeleton } from './cards/HostelCardSkeleteon';

interface IResults {
  country: string;
  city: string;
  subCity: string;
    genderType: HostelGenderType;
    hostelType: HostelType;
    roomCapacity: RoomCapacity;
  handleCount: (c: number) => void;
  checkInDate: string;
  checkOutDate: string;
  lat: number;
  lng: number;
}

export const SearchResults = (props: IResults) => {
  const { country, city, subCity, genderType, hostelType, roomCapacity, handleCount, checkInDate, checkOutDate, lat, lng } =
    props;
  const searchHostel = useGraphqlClientRequest<SearchHostelQuery, SearchHostelQueryVariables>(
    SearchHostel.loc?.source?.body!,
  );

  const fetchData = async () => {
    const res = await searchHostel({
      input: {
        city,
        subCity,
        pageNumber: 1,
        latitude: lat,
        longitude: lng,
        genderType,
        hostelType,
        roomCapacity
      },
    });
    return res.getHostelsBySearch;
  };

  const { data: hostels, isLoading,isFetching } = useQuery({
    queryKey: ['getHostelsss'],
    queryFn: fetchData,
    
  });



  
  if(hostels?.data?.length===0){
    return (
      <div className='w-full flex items-start justify-center h-full'>
        <h1 className='text-2xl text-red font-bold'>No hostels found</h1>
      </div>
    )
  }
  
  return (
    <div className="w-full ">
      {isLoading || isFetching && (
        <div className="md:flex w-full items-center justify-center gap-3 ">
          <HostelCardSkeleton />
          <HostelCardSkeleton />
          <HostelCardSkeleton />
        </div>
      )}
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-1 lg:grid-cols-2">
        {hostels?.data?.map((hostel: any) => {
          const imgUrl = hostel?.gallery?.[0]?.url || '/images/default-image.png';

          return (
            <div key={hostel.slug}>
              <Link
                href={`/hostel/${hostel?.slug}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`}
              >
                <HostelCard
                 hostel={hostel}
                 currentLat={lat}
                 currentLong={lng}
                />
              </Link>
            </div>
          );
        })
        
      }
      </div>
    </div>
  );
};

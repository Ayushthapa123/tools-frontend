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
  genderType: string;
  handleCount: (c: number) => void;
  checkInDate: string;
  checkOutDate: string;
  lat: number;
  lng: number;
  filteredHostels: any;
}

export const SearchResults = (props: IResults) => {
  const { country, city, subCity, genderType, handleCount, checkInDate, checkOutDate, lat, lng ,filteredHostels} =
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
      },
    });
    return res.getHostelsBySearch;
  };

  const { data: hostels, isLoading } = useQuery({
    queryKey: ['getHostels', country, city, subCity, genderType],
    queryFn: fetchData,
  });


  useEffect(() => {
    filteredHostels==null ? handleCount(hostels?.data?.length ?? 0) : handleCount(filteredHostels?.length ?? 0);
  }, [ handleCount, hostels?.data ]);
  
  if(filteredHostels?.length==0){
    return (
      <div className='w-full flex items-start justify-center h-full'>
        <h1 className='text-2xl text-red font-bold'>No hostels found</h1>
      </div>
    )
  }
  
  return (
    <div className="w-full ">
      {isLoading && (
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

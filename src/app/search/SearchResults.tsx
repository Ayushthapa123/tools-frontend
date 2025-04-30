'use client';
import { HostelCard } from './cards/HostelCard';

import { useEffect } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { SearchHomestay, SearchHomestayQuery, SearchHomestayQueryVariables } from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { HostelCardSkeleton } from './cards/HostelCardSkeleteon';

interface IResults {
  country: string;
  city: string;
  subCity: string;
  hostelType: string;
  genderType: string;
  handleCount: (c: number) => void;
  checkInDate: string;
  checkOutDate: string;
  lat: number;
  lng: number;
}

export const SearchResults = (props: IResults) => {
  const { country, city, subCity, hostelType, genderType, handleCount, checkInDate, checkOutDate, lat, lng } =
    props;
  const searchHomestay = useGraphqlClientRequest<SearchHomestayQuery, SearchHomestayQueryVariables>(
    SearchHomestay.loc?.source?.body!,
  );

  const fetchData = async () => {
    const res = await searchHomestay({
      input: {
        city,
        subCity,
        pageNumber: 1,
        latitude: lat,
        longitude: lng,
      },
    });
    return res.getHomestaysBySearch;
  };

  const { data: hostels, isLoading } = useQuery({
    queryKey: ['getHomestays', country, city, subCity, genderType],
    queryFn: fetchData,
  });
  //for shostels
  console.log('hostels', hostels);

  useEffect(() => {
    handleCount(hostels?.length ?? 0);
  }, [handleCount, hostels]);

  return (
    <div className="w-full ">
      {isLoading && (
          <div className="flex justify-center items-center w-full gap-3 ">
            <HostelCardSkeleton />
            <HostelCardSkeleton />
            <HostelCardSkeleton />
          </div>
        )}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-3">
        {hostels?.map(hostel => {
          const imgUrl = hostel?.image?.[0]?.url || '/images/default-image.png';

          return (
            <div key={hostel.slug}>
              <Link href={`/homestay/${hostel.slug}`}>
                <HostelCard
                  name={hostel.name}
                  country={hostel.address?.country ?? ''}
                  city={hostel.address?.city ?? ''}
                  subCity={hostel.address?.subCity ?? ''}
                  description={hostel.description ?? ''}
                  amount={hostel?.rooms?.[0]?.price?.baseAmount ?? 0}
                  currency={hostel?.rooms?.[0]?.price?.currency ?? ''}
                  imgUrl={imgUrl}
                  isOriginalHostel
                  oneSeater={null}
                  twoSeater={null}
                  threeSeater={null}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

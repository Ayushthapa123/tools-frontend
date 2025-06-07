'use client';
import { HostelCard } from './cards/HostelCard';

import { useEffect } from 'react';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { SearchHostel, SearchHostelQuery, SearchHostelQueryVariables } from 'src/gql/graphql';
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
}

export const SearchResults = (props: IResults) => {
  const { country, city, subCity, genderType, handleCount, checkInDate, checkOutDate, lat, lng } =
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
    handleCount(hostels?.data?.length ?? 0);
  }, [handleCount, hostels]);

  return (
    <div className="w-full ">
      {isLoading && (
        <div className="flex w-full items-center justify-center gap-3 ">
          <HostelCardSkeleton />
          <HostelCardSkeleton />
          <HostelCardSkeleton />
        </div>
      )}
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2  xl:grid-cols-3">
        {hostels?.data?.map(hostel => {
          const imgUrl = hostel?.gallery?.[0]?.url || '/images/default-image.png';

          return (
            <div key={hostel.slug}>
              <Link
                href={`/hostel/${hostel.slug}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`}
              >
                <HostelCard
                  name={hostel.name || ''}
                  country={hostel.address?.country ?? ''}
                  city={hostel.address?.city ?? ''}
                  subCity={hostel.address?.subCity ?? ''}
                  description={hostel.description ?? ''}
                  // amount={hostel?.rooms?.[0]?.price?.baseAmountPerDay ?? 0}
                  // currency={hostel?.rooms?.[0]?.price?.currency ?? ''}
                  imgUrl={imgUrl}
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

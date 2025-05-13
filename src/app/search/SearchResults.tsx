'use client';
import { HomestayCard } from './cards/HomestayCard';

import { useEffect } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { SearchHomestay, SearchHomestayQuery, SearchHomestayQueryVariables } from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { HomestayCardSkeleton } from './cards/HomestayCardSkeleteon';

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

  const { data: homestays, isLoading } = useQuery({
    queryKey: ['getHomestays', country, city, subCity, genderType],
    queryFn: fetchData,
  });

  useEffect(() => {
    handleCount(homestays?.length ?? 0);
  }, [handleCount, homestays]);

  return (
    <div className="w-full ">
      {isLoading && (
          <div className="flex justify-center items-center w-full gap-3 ">
            <HomestayCardSkeleton />
            <HomestayCardSkeleton />
            <HomestayCardSkeleton />
          </div>
        )}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-3">
          {homestays?.map(homestay => {
          const imgUrl = homestay?.image?.[0]?.url || '/images/default-image.png';

          return (
            <div key={homestay.slug}>
              <Link href={`/homestay/${homestay.slug}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`}>
                  <HomestayCard
                  name={homestay.name}
                  country={homestay.address?.country ?? ''}
                  city={homestay.address?.city ?? ''}
                  subCity={homestay.address?.subCity ?? ''}
                  description={homestay.description ?? ''}
                  amount={homestay?.rooms?.[0]?.price?.baseAmount ?? 0}
                  currency={homestay?.rooms?.[0]?.price?.currency ?? ''}
                  imgUrl={imgUrl}
                  oneSeater={null}
                  twoSeater={null}
                  threeSeater={null}
                  isOriginalHomestay
                  
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

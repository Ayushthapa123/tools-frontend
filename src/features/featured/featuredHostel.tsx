import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { HostelCard } from 'src/app/search/cards/HostelCard';
import { HostelCardSkeleton } from 'src/app/search/cards/HostelCardSkeleteon';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  GetFeaturedHostels,
  GetFeaturedHostelsQuery,
  GetFeaturedHostelsQueryVariables,
} from 'src/gql/graphql';

export const FeaturedHostel = () => {
  const queryValidity = useGraphqlClientRequest<
    GetFeaturedHostelsQuery,
    GetFeaturedHostelsQueryVariables
  >(GetFeaturedHostels.loc?.source?.body!);
  const getFeaturedHostels = async () => {
    const res = await queryValidity({
      pageSize: 12,
    });
    return res.getAllHostels;
  };
  const { data: hostels, isLoading } = useQuery({
    queryKey: [ 'getFeaturedHostels' ],
    queryFn: () => getFeaturedHostels(),
  });

  return (
    <div className="mx-auto flex w-[90vw] flex-col items-center justify-center py-6">
      <div className="my-6 flex flex-col items-center justify-between gap-0">
        <h2 className="m-0 text-xl font-bold text-primary lg:text-4xl">
          Top-Rated Hostels for Students & Travelers
        </h2>
        <p className="text-center text-sm lg:text-base tracking-wider">
          Explore our handpicked selection of the best hostels offering comfort, affordability, and great amenities.
        </p>
      </div>

      {isLoading && (
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <HostelCardSkeleton />
          <HostelCardSkeleton />
          <HostelCardSkeleton />
        </div>
      )}

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hostels?.data?.map(hostel => {
          const mainWallpaper = hostel?.gallery?.filter(img => img.isSelected === true)[ 0 ] ?? hostel?.gallery?.[ 0 ];
          var imgUrl = mainWallpaper?.url ?? '/images/default-image.png';
          if (imgUrl == 'https://example.com/image.jpg') imgUrl = '/images/default-image.png';
          return (
            <div
              key={hostel?.slug}
            >
              <Link href={`/hostel/${hostel?.slug}`}>
                <HostelCard
                  name={hostel?.name ?? ''}
                  country={hostel?.address?.country ?? ''}
                  city={hostel?.address?.city ?? ''}
                  subCity={hostel?.address?.subCity ?? ''}
                  description={hostel?.description ?? ''}
                  amount={hostel?.rooms?.[ 0 ]?.price?.baseAmountPerDay ?? 0}
                  currency={hostel?.rooms?.[ 0 ]?.price?.currency ?? ''}
                  imgUrl={String(imgUrl)}
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

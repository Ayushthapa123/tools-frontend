import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { HostelCard } from 'src/app/search/cards/HostelCard';
import { HostelCardSkeleton } from 'src/app/search/cards/HostelCardSkeleteon';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  GetFeaturedHostels,
  GetFeaturedHostelsQuery,
  GetFeaturedHostelsQueryVariables,
  HostelData,
} from 'src/gql/graphql';
import { motion } from 'framer-motion';

export const FeaturedHostel = () => {
  const queryValidity = useGraphqlClientRequest<
    GetFeaturedHostelsQuery,
    GetFeaturedHostelsQueryVariables
  >(GetFeaturedHostels.loc?.source?.body!);
  const getFeaturedHostels = async () => {
    const res = await queryValidity({
      pageSize:9,
    });
    return res.getAllHostels;
  };
  const { data: hostels, isLoading } = useQuery({
    queryKey: [ 'getFeaturedHostels' ],
    queryFn: () => getFeaturedHostels(),
  });

  return (
    <div className="mx-auto flex w-[90vw] flex-col items-center justify-center py-6">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="my-6 flex flex-col items-center justify-between gap-0">
        <h2 className="m-0 text-xl text-center font-bold text-primary lg:text-4xl">
          Top-Rated Hostels for Students & Travelers
        </h2>
        <p className="hidden md:block text-center text-sm lg:text-base tracking-wider">
          Explore our handpicked selection of the best hostels offering comfort, affordability, and great amenities.
        </p>
      </motion.div>

      {isLoading && (
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <HostelCardSkeleton />
          <HostelCardSkeleton />
          <HostelCardSkeleton />
        </div>
      )}

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hostels?.data?.map(hostel => {
          return (
            <motion.div
              key={hostel?.slug}
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
                <HostelCard
                  hostel={hostel as HostelData}
                />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

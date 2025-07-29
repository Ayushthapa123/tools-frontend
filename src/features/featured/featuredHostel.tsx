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
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="my-10 flex flex-col items-center justify-center gap-2"
      >
        <div className="relative mb-2 flex items-center justify-center">
          <span className="absolute left-[-32px] top-1 hidden md:block">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="16" fill="#E0E7FF" />
            </svg>
          </span>
          <h2 className="m-0 text-2xl md:text-3xl lg:text-5xl text-center font-extrabold text-primary drop-shadow-sm tracking-tight">
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Top-Rated Hostels
            </span>
            <span className="block text-lg md:text-xl font-semibold text-gray-700 mt-1">
              for Students &amp; Travelers
            </span>
          </h2>
          <span className="absolute right-[-32px] top-1 hidden md:block">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="16" fill="#E0E7FF" />
            </svg>
          </span>
        </div>
        <p className="text-center text-gray-500 text-base md:text-lg max-w-2xl px-2 tracking-wide font-medium">
          Discover our <span className="text-primary font-semibold">handpicked</span> hostels offering <span className="font-semibold">comfort</span>, <span className="font-semibold">affordability</span>, and <span className="font-semibold">great amenities</span>—perfect for your next stay.
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

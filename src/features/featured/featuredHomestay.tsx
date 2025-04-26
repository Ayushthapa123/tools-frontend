import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { HostelCard } from "src/app/search/cards/HostelCard";
import { HostelCardSkeleton } from "src/app/search/cards/HostelCardSkeleteon";
import { useGraphqlClientRequest } from "src/client/useGraphqlClientRequest";
import { GetFeaturedHomestays, GetFeaturedHomestaysQuery, GetFeaturedHomestaysQueryVariables } from "src/gql/graphql";

export const FeaturedHomestay = () => {
  const queryValidity = useGraphqlClientRequest<GetFeaturedHomestaysQuery,GetFeaturedHomestaysQueryVariables>(GetFeaturedHomestays.loc?.source?.body!);
  const getFeaturedHomestays=async()=>{
    const res=await queryValidity({
      pageSize:6
    })
    return res.getAllHomestays
  }
  const {data:homestays,isLoading}=useQuery({
    queryKey:['getFeaturedHomestays'],
    queryFn:()=>getFeaturedHomestays()
  })
  
  return (
    <div className="w-[90vw] mx-auto flex items-center justify-center flex-col  py-10">
      <div className="my-6 flex justify-between items-center flex-col  gap-0">
        <h2 className="text-4xl font-bold text-primary  m-0">Featured Homestays</h2>
        <p className="">Discover our most popular accommodations</p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <HostelCardSkeleton />
          <HostelCardSkeleton />
          <HostelCardSkeleton />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {homestays?.map(hostel => {
          const imgUrl = hostel.rooms?.reduce((acc, room) => {
            if (acc) return acc; // if we already found an image, keep it
            return room?.image?.[0]?.url || acc;
          }, hostel.image?.[0]?.url || '') || '/images/default-image.png';

          return (
            <div key={hostel.slug} className="transform transition-all duration-300 hover:translate-y-[-4px]">
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



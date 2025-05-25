import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { HostelCard } from "src/app/search/cards/HostelCard";
import { HostelCardSkeleton } from "src/app/search/cards/HostelCardSkeleteon";
import { useGraphqlClientRequest } from "src/client/useGraphqlClientRequest";
import { GetFeaturedHostels, GetFeaturedHostelsQuery, GetFeaturedHostelsQueryVariables } from "src/gql/graphql";

export const FeaturedHostel = () => {
      const queryValidity = useGraphqlClientRequest<GetFeaturedHostelsQuery,GetFeaturedHostelsQueryVariables>(GetFeaturedHostels.loc?.source?.body!);
  const getFeaturedHostels=async()=>{
    const res=await queryValidity({
      pageSize:6
    })
    return res.getAllHostels
  }
  const {data:hostels,isLoading}=useQuery({
    queryKey:['getFeaturedHostels'],
    queryFn:()=>getFeaturedHostels()
  })
  
  return (
    <div className="w-[90vw] mx-auto flex items-center justify-center flex-col  py-10">
      <div className="my-6 flex justify-between items-center flex-col  gap-0">
        <h2 className="text-xl lg:text-4xl font-bold text-primary m-0">Featured Hostels</h2>
        <p className="text-sm lg:text-lg text-center">Discover our most popular accommodations</p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <HostelCardSkeleton /> 
          <HostelCardSkeleton />
          <HostelCardSkeleton />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {hostels?.data?.map(hostel => {
        const mainWallpaper = hostel?.gallery?.filter(img => img.isSelected===true)[0]
          var imgUrl = mainWallpaper?.url ?? '/images/default-image.png';
          if(imgUrl == "https://example.com/image.jpg") imgUrl = "/images/default-image.png"
          return (
            <div key={hostel?.slug} className="transform transition-all duration-300 hover:translate-y-[-4px]">
                <Link href={`/hostel/${hostel?.slug}`}>
                  <HostelCard 
                  name={hostel?.name ?? ''}
                  country={hostel?.address?.country ?? ''}
                  city={hostel?.address?.city ?? ''}
                  subCity={hostel?.address?.subCity ?? ''}
                  description={hostel?.description ?? ''}
                  amount={hostel?.rooms?.[0]?.price?.baseAmountPerDay ?? 0}
                  currency={hostel?.rooms?.[0]?.price?.currency ?? ''}
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



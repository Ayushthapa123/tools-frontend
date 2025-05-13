import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { HomestayCard } from "src/app/search/cards/HomestayCard";
import { HomestayCardSkeleton } from "src/app/search/cards/HomestayCardSkeleteon";
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
  
  homestays?.map((hs) => (
    hs.image
  ))
  return (
    <div className="w-[90vw] mx-auto flex items-center justify-center flex-col  py-10">
      <div className="my-6 flex justify-between items-center flex-col  gap-0">
        <h2 className="text-xl lg:text-4xl font-bold text-primary m-0">Featured Homestays</h2>
        <p className="text-sm lg:text-lg text-center">Discover our most popular accommodations</p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <HomestayCardSkeleton /> 
          <HomestayCardSkeleton />
          <HomestayCardSkeleton />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {homestays?.map(homestay => {
        const mainWallpaper = homestay.image?.filter(img => img.isSelected)[ 0 ]
          var imgUrl = mainWallpaper?.url ?? '/images/default-image.png';
          if(imgUrl == "https://example.com/image.jpg") imgUrl = "/images/default-image.png"
          return (
            <div key={homestay.slug} className="transform transition-all duration-300 hover:translate-y-[-4px]">
              <Link href={`/homestay/${homestay.slug}`}>
                  <HomestayCard 
                  name={homestay.name}
                  country={homestay.address?.country ?? ''}
                  city={homestay.address?.city ?? ''}
                  subCity={homestay.address?.subCity ?? ''}
                  description={homestay.description ?? ''}
                  amount={homestay?.rooms?.[0]?.price?.baseAmount ?? 0}
                  currency={homestay?.rooms?.[0]?.price?.currency ?? ''}
                  imgUrl={String(imgUrl)}
                  isOriginalHomestay
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



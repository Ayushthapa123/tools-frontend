"use client";
import { useQuery } from "@tanstack/react-query";
import { useGraphqlClientRequest } from "src/client/useGraphqlClientRequest";
import { HomestayAmenitiesPage } from "src/features/amenity/HomestayAmenityPage";
import { GetHomestayByToken, GetHomestayByTokenQuery, GetHomestayByTokenQueryVariables } from "src/gql/graphql";

export default function AmenityPage() {
  const queryHomestayData = useGraphqlClientRequest<
    GetHomestayByTokenQuery,
    GetHomestayByTokenQueryVariables
  >(GetHomestayByToken.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHomestayData();
    return res.getHomestayByToken;
  };

  const { data: homestay, isLoading } = useQuery({
    queryKey: [ 'getHomestayByToken' ],
    queryFn: fetchData,
  });
  return (
    <>
      <div>
        <HomestayAmenitiesPage homestayId={Number(homestay?.id)} key={homestay?.id} />
      </div>
    </>
  )
}
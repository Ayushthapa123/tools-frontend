"use client";
import { useQuery } from "@tanstack/react-query";
import { useGraphqlClientRequest } from "src/client/useGraphqlClientRequest";
import { HostelAmenitiesPage } from "src/features/amenity/HostelAmenityPage";
import { GetHostelByToken, GetHostelByTokenQuery, GetHostelByTokenQueryVariables } from "src/gql/graphql";

export default function AmenityPage() {
  const queryHostelData = useGraphqlClientRequest<
    GetHostelByTokenQuery,
    GetHostelByTokenQueryVariables
  >(GetHostelByToken.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHostelData();
    return res.getHostelByToken;
  };

  const { data: hostel, isLoading } = useQuery({
    queryKey: [ 'getHostelByToken' ],
    queryFn: fetchData,
  });
  return (
    <>
      <div>
        <HostelAmenitiesPage hostelId={Number(hostel?.data?.id)} key={hostel?.data?.id} />
      </div>
    </>
  )
}
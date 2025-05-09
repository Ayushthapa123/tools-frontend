'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { BottomNav } from 'src/app/detail-page/BottomNav';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Footer from 'src/features/Footer';
import {
  GetHomestayBySlug,
  GetHomestayBySlugQuery,
  GetHomestayBySlugQueryVariables,
  Homestay,
} from 'src/gql/graphql';
import MainContent from './MainContent';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from 'src/components/Loading';
export function HostelPage({ slug,checkInDat,checkOutDat  }: { slug: string,checkInDat:string,checkOutDat:string}) {

  const searchParams = useSearchParams();
  const checkInDate = checkInDat ?? new Date().toISOString().split("T")[0];
  const checkOutDate = checkOutDat ?? new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const searchHostels = useGraphqlClientRequest<
    GetHomestayBySlugQuery,
    GetHomestayBySlugQueryVariables
  >(GetHomestayBySlug.loc?.source?.body!);

  const fetchData = async () => {
    const res = await searchHostels({
      slug,
    });
    return res.getHomestayBySlug;
  };

  const { data: hostel } = useQuery({
    queryKey: ['getHomestayBySlug'],
    queryFn: fetchData,
  });
  return (
    <>
      <CommonNav />
      <div className="w-full ">
        <div>
          {!hostel && <LoadingSpinner/>}
          <div>{hostel && <MainContent hostel={hostel as Homestay} checkInDate={checkInDate} checkOutDate={checkOutDate} />}</div>
          <Footer />
        </div>
      </div>
    </>
  );
}

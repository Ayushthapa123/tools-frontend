'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { BottomNav } from 'src/app/detail-page/BottomNav';
import { CarouselImageSlider } from 'src/app/detail-page/AdImageSlider';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Footer from 'src/features/Footer';
import {
  GetHomestayBySlug,
  GetHomestayBySlugQuery,
  GetHomestayBySlugQueryVariables,
  Homestay,
} from 'src/gql/graphql';
import MainContent from './MainContent';
import { CommonNav } from 'src/components/NavBar/CommonNav';
import { useSearchParams } from 'next/navigation';
export function HostelPage({ slug,  }: { slug: string}) {

  const searchParams = useSearchParams();
  const checkInDate = searchParams.get('checkInDate') ?? '';
  const checkOutDate = searchParams.get('checkOutDate') ?? '';

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
          <div>{hostel && <MainContent hostel={hostel as Homestay} checkInDate={checkInDate} checkOutDate={checkOutDate} />}</div>
          <Footer />
        </div>
      </div>
    </>
  );
}

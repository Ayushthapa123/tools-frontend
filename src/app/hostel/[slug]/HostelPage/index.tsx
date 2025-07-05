'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { BottomNav } from 'src/app/detail-page/BottomNav';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Footer from 'src/features/Footer';
import {
  GetHostelBySlug,
  GetHostelBySlugQuery,
  GetHostelBySlugQueryVariables,
  Hostel,
} from 'src/gql/graphql';
import MainContent from './MainContent';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from 'src/components/Loading';
export function HostelPage({
  slug,
  checkInDat,
  checkOutDat,
}: {
  slug: string;
  checkInDat: string;
  checkOutDat: string;
}) {
  const checkInDate = checkInDat ?? new Date().toISOString().split('T')[0];
  const checkOutDate = checkOutDat ?? new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const searchHostels = useGraphqlClientRequest<
    GetHostelBySlugQuery,
    GetHostelBySlugQueryVariables
  >(GetHostelBySlug.loc?.source?.body!);

  const fetchData = async () => {
    const res = await searchHostels({
      slug,
    });
    return res.getHostelBySlug;
  };

  const { data: hostel } = useQuery({
    queryKey: ['getHostelBySlug'],
    queryFn: fetchData,
  });
  if (!hostel) {
    return (
      <>
        <div className="flex min-h-[100vh] items-center justify-center">
          <div>
            <LoadingSpinner size="lg" color="primary" />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <CommonNav />
      <div className="w-full ">
        <div>
          <div>
            {hostel && (
              <MainContent
                hostel={hostel as Hostel}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            )}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

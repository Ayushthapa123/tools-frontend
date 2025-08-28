'use client';
import { useQuery } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  GetHostelBySlug,
  GetHostelBySlugQuery,
  GetHostelBySlugQueryVariables,
  Room,
  RoomData,
} from 'src/gql/graphql';
import LoadingSpinner from 'src/components/Loading';
import { BookingForm } from './BookingForm';
import { HostelInfo } from './HostelInfo';
import { useRouter, useSearchParams } from 'next/navigation';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { useRoomStore } from 'src/store/roomStore';
import Footer from 'src/features/Footer';
import { RxCross2 } from 'react-icons/rx';
import { useEffect } from 'react';
import { graphqlClient } from 'src/client/graphqlClient';

import { Metadata } from 'next';
import { ResolvingMetadata } from 'next';
import { gql } from 'graphql-request';
import { ApplicationForm } from './ApplicationForm';
type Props = {
  params: { id: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};





export default function BookingPage({slug}:{slug:string}) {


  const searchHostels = useGraphqlClientRequest<
    GetHostelBySlugQuery,
    GetHostelBySlugQueryVariables
  >(GetHostelBySlug.loc?.source?.body!);

  const fetchData = async () => {
    const res = await searchHostels({
      slug: slug,
    });
    return res.getHostelBySlug;
  };

  const { data: hostel, isLoading } = useQuery({
    queryKey: ['getHostelBySlug', slug],
    queryFn: fetchData,
  });





  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner color="primary" size="lg" />
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl text-gray-600">Hostel not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 ">
      <CommonNav />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 ">
          {/* Left Column - hostel Information */}
          <div className="overflow-y-scroll rounded-lg bg-white p-6 pr-1 shadow-md md:min-h-[780px]">
            <HostelInfo
              name={hostel.data?.name || ''}
              hostelId={Number(hostel.data?.id)}
              description={hostel.data?.description || ''}
              address={{
                city: hostel.data?.address?.city || '',
                country: hostel.data?.address?.country || '',
                street: hostel.data?.address?.street || '',
                subCity: hostel.data?.address?.subCity || '',
              }}
              contact={{
                phone: hostel.data?.contact?.phone || '',
                email: hostel.data?.contact?.email || '',
              }}
              images={
                hostel.data?.rooms?.flatMap(room => room.image?.map(img => img.url) || []) || []
              }
              rooms={hostel.data?.rooms as RoomData[]}
              selectedRoomId={""} // TODO: some change needed
              slug={slug}
              onRoomSelect={() => {}}
              admissionFee={hostel.data?.admissionFee ?? undefined}
              depositAmount={hostel.data?.depositAmount ?? undefined}
            />
          </div>

          {/* Right Column - Booking Form */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold">Hostel Application Form</h2>
        
         
          <ApplicationForm slug={slug} hostelId={Number(hostel.data?.id)} />
        
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

'use client';

import { useQuery } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import {
  GetHomestayBySlug,
  GetHomestayBySlugQuery,
  GetHomestayBySlugQueryVariables,
  Room,
} from 'src/gql/graphql';
import LoadingSpinner from 'src/components/Loading';
import { BookingForm } from './BookingForm';
import { HomestayInfo } from './HomestayInfo';
import { useRouter, useSearchParams } from 'next/navigation';
import { CommonNav } from 'src/components/NavBar/CommonNav';
import { useRoomStore } from 'src/store/roomStore';


export default function BookingPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
const {roomId,setRoomId}=useRoomStore()

const handleRoomSelect=(roomId:string)=>{
  setRoomId(roomId)
}

  const searchHostels = useGraphqlClientRequest<
    GetHomestayBySlugQuery,
    GetHomestayBySlugQueryVariables
  >(GetHomestayBySlug.loc?.source?.body!);

  const fetchData = async () => {
    const res = await searchHostels({
      slug: params.slug,
    });
    return res.getHomestayBySlug;
  };

  const { data: homestay, isLoading } = useQuery({
    queryKey: ['getHomestayBySlug', params.slug],
    queryFn: fetchData,
  });



  const handleBookingSuccess = () => {
    router.push('/my-bookings');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner color="primary" size="lg" />
      </div>
    );
  }

  if (!homestay) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl text-gray-600">Homestay not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <CommonNav />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Homestay Information */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <HomestayInfo
              name={homestay.name}
              description={homestay.description || ''}
              address={{
                city: homestay.address?.city || '',
                country: homestay.address?.country || '',
                street: homestay.address?.street || '',
                subCity: homestay.address?.subCity || '',
              }}
              contact={{
                phone: homestay.contact?.phone || '',
                email: homestay.contact?.email || '',
              }}
              images={homestay.rooms?.flatMap(room => room.image?.map(img => img.url) || []) || []}
              rooms={homestay.rooms as Room[]}
              selectedRoomId={roomId}
              onRoomSelect={handleRoomSelect}
            />
          </div>

          {/* Right Column - Booking Form */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold">Book Your Stay</h2>
            {roomId ? (
              <BookingForm
                homestayId={String(homestay.id)}
                roomId={roomId}
                onSuccess={handleBookingSuccess}
                rooms={homestay.rooms || []}
                homeStaySlug={params.slug}
              />
            ) : (
              <div className="text-center text-gray-600">
                Please select a room to proceed with booking
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

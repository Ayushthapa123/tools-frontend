'use client';

import { useQuery } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import {
  GetHomestayBySlug,
  GetHomestayBySlugQuery,
  GetHomestayBySlugQueryVariables,
  Room,
  RoomData,
} from 'src/gql/graphql';
import LoadingSpinner from 'src/components/Loading';
import { BookingForm } from './BookingForm';
import { HomestayInfo } from './HomestayInfo';
import { useRouter, useSearchParams } from 'next/navigation';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { useRoomStore } from 'src/store/roomStore';
import Footer from 'src/features/Footer';
import { RxCross2 } from 'react-icons/rx';
import { useEffect } from 'react';

export default function BookingPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { roomIds, setRoomIds } = useRoomStore();

  const handleRoomSelect = (roomId: string) => {
    setRoomIds([...roomIds, roomId]);
  };

  const searchHomestays = useGraphqlClientRequest<
    GetHomestayBySlugQuery,
    GetHomestayBySlugQueryVariables
  >(GetHomestayBySlug.loc?.source?.body!);

  const fetchData = async () => {
    const res = await searchHomestays({
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

  // it should invoked only once
  useEffect(() => {
    // if selected rooms are not among the current room of that homestay remove them.
    if (homestay?.data?.rooms) {
      const currentRooms = homestay?.data?.rooms?.map(room => room.id) || [];
      const selectedRooms = roomIds.filter(id => currentRooms.includes(id));
      setRoomIds(selectedRooms);
    }
  }, [homestay?.data?.rooms]);

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
    <div className="bg-gray-50 ">
      <CommonNav />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 ">
          {/* Left Column - Homestay Information */}
          <div className="overflow-y-scroll rounded-lg bg-white p-6 pr-1 shadow-md md:min-h-[780px]">
            <HomestayInfo
              name={homestay.data?.name || ''}
              homestayId={Number(homestay.data?.id)}
              description={homestay.data?.description || ''}
              address={{
                city: homestay.data?.address?.city || '',
                country: homestay.data?.address?.country || '',
                street: homestay.data?.address?.street || '',
                subCity: homestay.data?.address?.subCity || '',
              }}
              contact={{
                phone: homestay.data?.contact?.phone || '',
                email: homestay.data?.contact?.email || '',
              }}
              images={homestay.data?.rooms?.flatMap(room => room.image?.map(img => img.url) || []) || []}
              rooms={homestay.data?.rooms as RoomData[]}
              selectedRoomId={roomIds[0]} // TODO: some change needed
              slug={params.slug}
              onRoomSelect={handleRoomSelect}
            />
          </div>

          {/* Right Column - Booking Form */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold">Book Your Stay</h2>
            {roomIds.length > 0 ? (
              <BookingForm
                homestayId={String(homestay.data?.id)}
                // roomIds={roomIds  }
                onSuccess={handleBookingSuccess}
                rooms={homestay.data?.rooms || []}
                homeStaySlug={params.slug}
              />
            ) : (
              <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-redHover">
                <p>
                  <RxCross2 className="text-4xl" />
                </p>
                <p>Please select a room to proceed with booking</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

'use client';

import { useQuery } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
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

export default function BookingPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { roomIds, setRoomIds } = useRoomStore();

  const handleRoomSelect = (roomId: string) => {
    setRoomIds([...roomIds, roomId]);
  };

  const searchHostels = useGraphqlClientRequest<
    GetHostelBySlugQuery,
    GetHostelBySlugQueryVariables
  >(GetHostelBySlug.loc?.source?.body!);

  const fetchData = async () => {
    const res = await searchHostels({
      slug: params.slug,
    });
    return res.getHostelBySlug;
  };

  const { data: hostel, isLoading } = useQuery({
    queryKey: ['getHostelBySlug', params.slug],
    queryFn: fetchData,
  });

  const handleBookingSuccess = () => {
    router.push('/my-bookings');
  };

  // it should invoked only once
  useEffect(() => {
    // if selected rooms are not among the current room of that hostel remove them.
    if (hostel?.data?.rooms) {
      const currentRooms = hostel?.data?.rooms?.map(room => room.id) || [];
      const selectedRooms = roomIds.filter(id => currentRooms.includes(id));
      setRoomIds(selectedRooms);
    }
  }, [hostel?.data?.rooms]);

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
              images={hostel.data?.rooms?.flatMap(room => room.image?.map(img => img.url) || []) || []}
              rooms={hostel.data?.rooms as RoomData[]}
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
                hostelId={String(hostel.data?.id)}
                // roomIds={roomIds  }
                onSuccess={handleBookingSuccess}
                rooms={hostel.data?.rooms || []}
                hostelSlug={params.slug}
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

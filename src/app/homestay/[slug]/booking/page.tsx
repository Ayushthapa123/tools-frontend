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
import Footer from 'src/features/Footer';
import {RxCross2} from "react-icons/rx"
import { useEffect } from 'react';


export default function BookingPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
const {roomIds,setRoomIds}=useRoomStore()

const handleRoomSelect=(roomId:string)=>{
  setRoomIds([...roomIds,roomId])
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


// it should invoked only once
  useEffect(()=> {
    // if selected rooms are not among the current room of that homestay remove them. 
if(homestay?.rooms){
    const currentRooms = homestay?.rooms?.map(room => room.id) || [];
    const selectedRooms = roomIds.filter(id => currentRooms.includes(id));
    setRoomIds(selectedRooms);
}

  }, [homestay?.rooms]);

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
          <div className="rounded-lg bg-white p-6 pr-1 shadow-md md:min-h-[780px] overflow-y-scroll">
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
              selectedRoomId={roomIds[0]}  // TODO: some change needed
              slug={params.slug}
              onRoomSelect={handleRoomSelect}
            />
          </div>

          {/* Right Column - Booking Form */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold">Book Your Stay</h2>
            {roomIds.length > 0 ? (
              <BookingForm
                homestayId={String(homestay.id)}
                // roomIds={roomIds  }
                onSuccess={handleBookingSuccess}
                rooms={homestay.rooms || []}
                homeStaySlug={params.slug}
              />
            ) : (
                <div className="h-[50vh] w-full text-redHover flex items-center justify-center flex-col gap-4">
                  <p><RxCross2 className='text-4xl'/></p>
                <p>Please select a room to proceed with booking</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

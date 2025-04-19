'use client';

import { useQuery } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import {
  GetHomestayBySlugQuery,
  GetHomestayBySlugQueryVariables,
  GetHomestayBySlugDocument,
  GetHomestayBySlug,
  Room,
} from 'src/gql/graphql';
import LoadingSpinner from 'src/components/Loading';
import { BookingForm } from './BookingForm';
import { HomestayInfo } from './HomestayInfo';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { gql } from 'graphql-request';
import { CommonNav } from 'src/components/NavBar/CommonNav';

const GET_HOMESTAY_BY_SLUG = gql`
  query getHomestayBySlug($slug: String!) {
    getHomestayBySlug(slug: $slug) {
      id
      name
      description

      moderatedBySuperAdmin
      moderatedByCommunityOwner
      address {
        country
        city
        subCity
        street
      }
      contact {
        phone
        altPhone
        email
      }
      rooms {
        id
        caption
        capacity
        roomNumber
        status
        attachBathroom
        homestayId
        createdAt
        updatedAt
        image {
          url
          id
        } 

        price {
          amount
          currency
        }
      }
    }
  }
`;

export default function BookingPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [selectedRoomId, setSelectedRoomId] = useState<string>(); 

  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');

  const searchHostels = useGraphqlClientRequest<
    GetHomestayBySlugQuery,
    GetHomestayBySlugQueryVariables
  >(GET_HOMESTAY_BY_SLUG);

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

  useEffect(() => {
    if (homestay?.rooms && homestay.rooms.length > 0) {
      setSelectedRoomId(roomId || homestay.rooms[0].id);
    }
  }, [homestay?.rooms, roomId]);

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
              selectedRoomId={selectedRoomId}
              onRoomSelect={setSelectedRoomId}
            />
          </div>

          {/* Right Column - Booking Form */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold">Book Your Stay</h2>
            {selectedRoomId ? (
              <BookingForm
                homestayId={String(homestay.id)}
                roomId={selectedRoomId}
                onSuccess={handleBookingSuccess}
                rooms={homestay.rooms || []}
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

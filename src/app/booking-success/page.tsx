'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ConfirmBooking,
  ConfirmBookingMutation,
  ConfirmBookingMutationVariables,
  GetBookingByKeyQuery,
  GetBookingByKeyQueryVariables,
} from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { GetBookingByKey } from 'src/gql/graphql';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';
import formatDate from 'src/utils/date';
// Static data for demonstration

const roomDetails = {
  name: 'Deluxe Suite',
  type: 'Double Bed',
  amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Room Service'],
  maxGuests: 2,
  image:
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
};

export default function BookingSuccessPage() {
  return (
    <div>
      <Suspense>
        <MakeBookingConfirmation />
      </Suspense>
    </div>
  );
}

const MakeBookingConfirmation = () => {
  const searchParams = useSearchParams();
  const bookingKey = searchParams.get('bookingKey');
  const bookingId = searchParams.get('bookingId');

  const [isBookingValid, setIsBookingValid] = useState(false);

  const mutateConfirmBooking = useGraphqlClientRequest<
    ConfirmBookingMutation,
    ConfirmBookingMutationVariables
  >(ConfirmBooking.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateConfirmBooking });

  const handleConfirmBooking = async () => {
    try {
      const response = await mutateAsync({ bookingKey: bookingKey! });
      // Set isBookingValid based on the response
      setIsBookingValid(!!response.confirmBooking?.count);
    } catch (error) {
      console.error('Booking confirmation failed:', error);
      setIsBookingValid(false);
    }
  };

  useEffect(() => {
    if (bookingKey) {
      handleConfirmBooking();
    } else {
      setIsBookingValid(false);
    }
  }, [bookingKey]);

  // Show loading state while confirming
  if (!bookingKey || !bookingId) {
    return <RedirectToBookingFailed />;
  }

  return <div>{isBookingValid && <BookingSuccessPageContent />}</div>;
};

const RedirectToBookingFailed = () => {
  const router = useRouter();
  useEffect(() => {
    // router.push('/booking-failed');
  }, [router]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>Redirecting to booking failed page...</div>
    </div>
  );
};

function BookingSuccessPageContent() {
  const searchParams = useSearchParams();
  const bookingKey = searchParams.get('bookingKey');
  const queryBooking = useGraphqlClientRequest<GetBookingByKeyQuery, GetBookingByKeyQueryVariables>(
    GetBookingByKey.loc?.source?.body!,
  );

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryBooking({ bookingKey: bookingKey! });
    return res.bookingsWithKey;
  };

  const { data: bookings } = useQuery({
    queryKey: ['getBookingByKey'],
    queryFn: fetchData,
  });

  if (!bookings) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">No booking found</h2>
          <p className="text-base-content/70">
            We couldnt find your booking details. Please check your booking key or contact support.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Success Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-success/20 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-base-content">Booking Confirmed!</h1>
          <p className="text-base-content/70">
            Your booking has been successfully confirmed. We&apos;ve sent the details to your email.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="card mb-8 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4 text-xl font-semibold">Booking Summary</h2>

            {bookings.data?.map(booking => {
              return (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2" key={booking.id}>
                  <div>
                    <h3 className="text-sm font-medium text-base-content/70">Booking Key</h3>
                    <p className="mt-1 text-lg font-semibold">{booking.bookingKey}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-base-content/70">Status</h3>
                    <p className="mt-1 text-lg font-semibold text-success">{booking.status}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-base-content/70">Check-in</h3>
                    <p className="mt-1 text-lg font-semibold">{formatDate(booking.startDate)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-base-content/70">Check-out</h3>
                    <p className="mt-1 text-lg font-semibold">{formatDate(booking.endDate)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      {/* Room Details Card */}
      <div className="card mb-8 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4 text-xl font-semibold">Room Details</h2>
          {bookings.data?.map(booking => {
            return (
              <div className="flex flex-col gap-6 md:flex-row" key={booking.id}>
              <div className="md:w-1/3">
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={booking.room?.image?.[0]?.url ?? roomDetails.image}
                    alt={booking.room?.caption ?? roomDetails.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="mb-2 text-lg font-semibold">{booking?.room?.caption}</h3>
                <p className="mb-4 text-base-content/70">
                  Room Number:{booking?.room?.roomNumber}
                </p>
                <div>
                  <h4 className="mb-2 text-sm font-medium text-base-content/70">{/* Amenities */}</h4>
                  <div className="flex flex-wrap gap-2">
                    {/* {roomDetails.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="badge badge-outline"
                        >
                          {amenity}
                        </span>
                      ))} */}
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* User Details Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4 text-xl font-semibold">Guest Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-base-content/70">Full Name</h3>
                <p className="mt-1 text-lg font-semibold">{bookings?.data?.[0]?.guest?.fullName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-base-content/70">Email</h3>
              <p className="mt-1 text-lg font-semibold">{bookings?.data?.[0]?.guest?.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-base-content/70">Phone</h3>
                <p className="mt-1 text-lg font-semibold">{bookings?.data?.[0]?.guest?.phoneNumber}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-base-content/70">Address</h3>
                {/* <p className="mt-1 text-lg font-semibold">{bookings?.[0]?.data?.guest} </p> */}
            </div>
          </div>
        </div>
      </div>
      </div>

    </div>
  );
}

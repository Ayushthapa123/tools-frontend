'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { GetBookingByKeyQuery, GetBookingByKeyQueryVariables } from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { GetBookingByKey } from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import formatDate from 'src/utils/date';

const roomDetails = {
  name: 'Deluxe Suite',
  type: 'Double Bed',
  amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Room Service'],
  maxGuests: 2,
  image:
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
};

export default function BookingFailedPage() {
  return (
    <div>
      <Suspense>
        <BookingFailedPageContent />
      </Suspense>
    </div>
  );
}

function BookingFailedPageContent() {
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

  const { data: booking } = useQuery({
    queryKey: ['getBookingByKey'],
    queryFn: fetchData,
  });
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
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Failure Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-error/20 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-error"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-base-content">Booking Failed</h1>
          <p className="text-base-content/70">
            We apologize, but there was an issue processing your booking. Please try again or
            contact our support team for assistance.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="card mb-8 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4 text-xl font-semibold">Booking Details</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Booking Key</h3>
                <p className="mt-1 text-lg font-semibold">{booking?.data?.[0]?.bookingKey}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Status</h3>
                <p className="mt-1 text-lg font-semibold text-error">Failed</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Check-in</h3>
                <p className="mt-1 text-lg font-semibold">
                  {formatDate(booking?.data?.[0]?.startDate)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Check-out</h3>
                <p className="mt-1 text-lg font-semibold">
                  {formatDate(booking?.data?.[0]?.endDate)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Room Details Card */}
        <div className="card mb-8 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4 text-xl font-semibold">Room Details</h2>
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="md:w-1/3">
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={roomDetails.image}
                    alt={roomDetails.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="mb-2 text-lg font-semibold">{booking?.data?.[0]?.room?.caption}</h3>
                <p className="mb-4 text-base-content/70">
                  Room Number:{booking?.data?.[0]?.room?.roomNumber}
                </p>
                <div>
                  <h4 className="mb-2 text-sm font-medium text-base-content/70">Amenities</h4>
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
          </div>
        </div>

        {/* User Details Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4 text-xl font-semibold">Guest Information</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Full Name</h3>
                <p className="mt-1 text-lg font-semibold">{booking?.data?.[0]?.guest?.fullName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Email</h3>
                <p className="mt-1 text-lg font-semibold">{booking?.data?.[0]?.guest?.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Phone</h3>
                <p className="mt-1 text-lg font-semibold">
                  {booking?.data?.[0]?.guest?.phoneNumber}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Address</h3>
                <p className="mt-1 text-lg font-semibold">
                  {/* {booking?.data?.[0]?.guest?.address} */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="mb-4 text-base-content/70">Need help? Our support team is available 24/7</p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="btn btn-primary">
              Contact Support
            </Link>
            <Link href="/" className="btn btn-ghost">
              Try Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client"
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ConfirmBooking, ConfirmBookingMutation, ConfirmBookingMutationVariables, GetBookingByKeyQuery, GetBookingByKeyQueryVariables, LogInUser } from "src/gql/graphql";
import {  useGraphqlClientRequest } from "src/client/useGraphqlClientRequest";
import { GetBookingByKey } from "src/gql/graphql";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import formatDate from "src/utils/date";
// Static data for demonstration

const roomDetails = {
  name: "Deluxe Suite",
  type: "Double Bed",
  amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar", "Room Service"],
  maxGuests: 2,
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
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

  const mutateLoginRequest = useGraphqlClientRequest<ConfirmBookingMutation,ConfirmBookingMutationVariables>(
    ConfirmBooking.loc?.source.body!,
  );

  const { mutateAsync } = useMutation({ mutationFn: mutateLoginRequest });

  const handleConfirmBooking = async () => {
    try {
      const response = await mutateAsync({ bookingKey: bookingKey!, bookingId: bookingId! });
      // Set isBookingValid based on the response
      setIsBookingValid(!!response.confirmBooking?.id);
    } catch (error) {
      console.error('Booking confirmation failed:', error);
      setIsBookingValid(false);
    }
  };

  useEffect(() => {
    if (bookingKey && bookingId) {
      handleConfirmBooking();
    } else {
      setIsBookingValid(false);
    }
  }, [bookingKey, bookingId]);

  // Show loading state while confirming
  if (!bookingKey || !bookingId) {
    return <RedirectToBookingFailed />;
  }

  return (
    <div>
  {isBookingValid && <BookingSuccessPageContent />}
    </div>
  );
};

const RedirectToBookingFailed = () => {
  const router = useRouter();
  useEffect(() => {
    // router.push('/booking-failed');
  }, [router]);
  return (  
    <div className="flex items-center justify-center min-h-screen">
      <div>Redirecting to booking failed page...</div>
    </div>
  );
};

 function BookingSuccessPageContent() {
  const searchParams = useSearchParams();
  const bookingKey = searchParams.get('bookingKey');
  const queryBooking = useGraphqlClientRequest<
  GetBookingByKeyQuery,
  GetBookingByKeyQueryVariables
>(GetBookingByKey.loc?.source?.body!);

//initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
const fetchData = async () => {
  const res = await queryBooking({bookingKey:bookingKey!});
  return res.bookingWithKey;
};

const { data: booking } = useQuery({
  queryKey: ['getBookingByKey'],
  queryFn: fetchData,
});
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-success/20 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-base-content/70">
            Your booking has been successfully confirmed. We&apos;ve sent the details to
            your email.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">
              Booking Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Booking Key</h3>
                <p className="mt-1 text-lg font-semibold">
                  {booking?.bookingKey}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Status</h3>
                <p className="mt-1 text-lg font-semibold text-success">
                  {booking?.status}
                  
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Check-in</h3>
                <p className="mt-1 text-lg font-semibold">
                  {formatDate(booking?.startDate)} 
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Check-out</h3>
                <p className="mt-1 text-lg font-semibold">
                  {formatDate(booking?.endDate)} 
                </p>
              </div>
              
             
            </div>
          </div>
        </div>

        {/* Room Details Card */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">
              Room Details
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <Image
                    src={booking?.room?.image?.[0]?.url ?? roomDetails.image}
                    alt={booking?.room?.caption ?? roomDetails.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-lg font-semibold mb-2">
                  {booking?.room?.caption}
                </h3>
                <p className="text-base-content/70 mb-4">Room Number:{booking?.room?.roomNumber}</p>
                <div>
                  <h4 className="text-sm font-medium text-base-content/70 mb-2">
                    {/* Amenities */}
                  </h4>
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
            <h2 className="card-title text-xl font-semibold mb-4">
              Guest Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Full Name</h3>
                <p className="mt-1 text-lg font-semibold">
                  {booking?.guest?.fullName}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Email</h3>
                <p className="mt-1 text-lg font-semibold">
                  {booking?.guest?.email}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Phone</h3>
                <p className="mt-1 text-lg font-semibold">
                  {booking?.guest?.phoneNumber}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-base-content/70">Address</h3>
                <p className="mt-1 text-lg font-semibold">
                
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

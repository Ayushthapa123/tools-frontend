import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { BookingCard } from './BookingCard';
import {
  BookingsByHomestay,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import {
  BookingsByHomestayQuery,
  BookingsByHomestayQueryVariables,
} from 'src/gql/graphql';

export const ActiveBookings = () => {
  const querySignupUrl = useGraphqlClientRequest<
    BookingsByHomestayQuery,
    BookingsByHomestayQueryVariables
      >(BookingsByHomestay.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await querySignupUrl();
    return res.bookingsByHomestay;
  };

  const { data: bookings } = useQuery({
    queryKey: ['getBookings'],
    queryFn: fetchData,
  });
  return (
    <div className="w-full ">
      <div className="grid gap-[1rem]  bg-slate-100">
        {bookings?.map(booking => (
          <div key={booking.id}>
            <BookingCard
              id={booking.id}
              title={booking.room?.caption ?? ''}
              roomNumber={booking.room?.roomNumber ?? ''}
              roomId={booking.room?.id ?? ''}
              checkInDate={booking.startDate ?? ''}
              checkOutDate={booking.endDate ?? ''}
              status={booking.status ?? ''}
            
              paymentStatus={booking.status ?? ''}
              
              guestName={booking.guest?.fullName ?? ''}
              guestEmail={booking.guest?.email ?? ''}

              roomImage={booking.room?.image?.[0]?.url ?? ''}
              roomCaption={booking.room?.image?.[0]?.caption ?? ''}
              
            />
          </div>
        ))}
      </div>
    </div>
  );
};

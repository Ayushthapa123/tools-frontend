import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCamera, FaEdit, FaCalendar, FaClock, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { GetGoogleOauthUrlQueryVariables, MyBookings, MyBookingsQueryVariables, BookingStatus, PaymentPlatformName, Room, Booking, LogOut, LogOutMutationVariables, LogOutMutation } from 'src/gql/graphql';
import LogoutIcon from 'src/components/icons/LogOut';
import { MyBookingsQuery } from 'src/gql/graphql';
import { useUserStore } from 'src/store/userStore';
import { useMutation, useQuery } from '@tanstack/react-query';

// Update the interface to match the exact GraphQL schema


// Update the BookingCard component to use the correct data structure
const BookingCard = ({ booking }: { booking: Booking  }) => {
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.Confirmed:
        return 'badge-success';
      case BookingStatus.Pending:
        return 'badge-warning';
      case BookingStatus.Cancelled:
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body">
        <div className="flex justify-between items-start mb-4">
          <h3 className="card-title text-lg font-bold">{booking.room.caption}</h3>
          <div className={`badge ${getStatusColor(booking.status)}`}>
            {booking.status.toLowerCase()}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FaUser className="text-primary" />
            <span className="text-sm">Guest: {booking.guest.fullName}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendar className="text-primary" />
            <span className="text-sm">From: {formatDate(booking.startDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendar className="text-primary" />
            <span className="text-sm">To: {formatDate(booking.endDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            <span className="text-sm">Room: {booking.room.roomNumber}</span>
          </div>

          <div className="divider my-2"></div>

          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-lg font-semibold">
               Payment Via: {/* ${booking.room.price?.amount || 0} */}
              </span>
              <div className="text-xs text-base-content/70">
                {booking.paymentPlatformName}
              </div>
            </div>
            <button className="btn btn-primary btn-sm">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OwnBookings = (props: { userType: string }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const mutateLogOutRequest = useGraphqlClientRequest<LogOutMutation, LogOutMutationVariables>(
    LogOut.loc?.source.body!,
  );

  const { mutateAsync } = useMutation({ mutationFn: mutateLogOutRequest });

  const handleLogout = () => {
    mutateAsync({}).then(res => {
      if (res?.logout?.success) {
        router.push('/login');
      }
    });
  };

  const querySignupUrl = useGraphqlClientRequest<
    MyBookingsQuery,
    MyBookingsQueryVariables
  >(MyBookings.loc?.source?.body!);

  const fetchData = async () => {
    const res = await querySignupUrl();
    return res.myBookings;
  };

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['myBookings'],
    queryFn: fetchData,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">My Bookings</h3>
          
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : bookings && bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings?.map((booking) => (
              <BookingCard key={booking.id} booking={booking as Booking} />
            ))}
          </div>
        ) : (
          <div className="card bg-base-100 shadow-xl p-8">
            <div className="text-center space-y-4">
              <div className="text-5xl opacity-30">📅</div>
              <h3 className="text-xl font-semibold">No Bookings Found</h3>
              <p className="text-base-content/70">
                You haven&apos;t made any bookings yet.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => router.push('/search')}
              >
                Browse Homestays
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

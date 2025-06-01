import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { BookingsByHostel, PaymentPlatformName } from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import { BookingsByHostelQuery, BookingsByHostelQueryVariables } from 'src/gql/graphql';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const ActiveBookings = () => {
  const querySignupUrl = useGraphqlClientRequest<
    BookingsByHostelQuery,
    BookingsByHostelQueryVariables
  >(BookingsByHostel.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await querySignupUrl();
    return res.bookingsByHostel;
  };

  const { data: bookings } = useQuery({
    queryKey: ['getBookings'],
    queryFn: fetchData,
  });

  // Transform bookings into calendar events
  const events =
    bookings?.data?.map(booking => ({
      id: booking.id,
      title: `Booking #${booking.bookingKey}`,
      start: booking.startDate,
      end: booking.endDate,
      extendedProps: {
        roomId: booking.room?.id,
        guestId: booking.guest?.id,
        status: booking.status,
        bookingKey: booking.bookingKey,
        paymentPlatform: PaymentPlatformName.Stripe,
        guest: {
          name: booking.guest?.fullName,
          email: booking.guest?.email,
        },
        room: {
          name: booking?.room?.caption,
          roomNumber: booking?.room?.roomNumber,
          price: booking?.room?.price,
        },
      },
    })) || [];

  const handleEventClick = (arg: any) => {
    const event = arg.event;
    const booking = event.extendedProps;
  };

  return (
    <div className="bg-red-400  w-full">
      <div className="mx-auto w-full  rounded-lg bg-white p-4 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Bookings Calendar</h1>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridDay',
          }}
          events={events}
          eventClick={handleEventClick}
          height="auto"
          timeZone="UTC"
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
          }}
          eventContent={eventInfo => {
            const booking = eventInfo.event.extendedProps;
            return (
              <div className="m-1 rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-shadow duration-200 hover:shadow-md">
                {/* Header with Booking Number and Status */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {eventInfo.event.title}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      booking.status === 'CONFIRMED'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* Main Content - Two Column Layout */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {/* Left Column */}
                  <div className="space-y-2">
                    {/* Room Information */}
                    <div className="flex items-start">
                      <svg
                        className="mr-1.5 mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-700">
                          {booking.room.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          Room #{booking.room.roomNumber}
                        </span>
                      </div>
                    </div>

                    {/* Dates Information */}
                    <div className="flex items-start">
                      <svg
                        className="mr-1.5 mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">
                          Check-in:{' '}
                          {eventInfo.event.start
                            ? new Date(eventInfo.event.start).toLocaleDateString()
                            : 'N/A'}
                        </span>
                        <span className="text-xs text-gray-500">
                          Check-out:{' '}
                          {eventInfo.event.end
                            ? new Date(eventInfo.event.end).toLocaleDateString()
                            : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-2">
                    {/* Guest Information */}
                    <div className="flex items-start">
                      <svg
                        className="mr-1.5 mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-700">
                          {booking.guest.name}
                        </span>
                        <span className="text-xs text-gray-500">{booking.guest.email}</span>
                      </div>
                    </div>

                    {/* Price and Payment Information */}
                    <div className="flex items-start">
                      <svg
                        className="mr-1.5 mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">
                          Payment Status: {booking.status || 'N/A'}
                        </span>
                        <span className="text-xs text-gray-500">
                          Amount: {booking.room?.price?.amount || 'N/A'}{' '}
                          {booking.room?.price?.currency || ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

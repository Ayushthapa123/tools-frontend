'use client';

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Enums to match your schema
enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

enum PaymentPlatformName {
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL'
}

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Sample data matching your schema with bookings for different dates
const sampleBookings = [
  // Today's bookings
  {
    id: 1,
    roomId: 101,
    guestId: 1,
    startDate: today,
    endDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
    status: BookingStatus.CONFIRMED,
    paymentPlatformName: PaymentPlatformName.STRIPE,
    bookingKey: 'BK001',
    guest: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      address: '123 Main St, City, Country'
    },
    room: {
      id: 101,
      name: 'Deluxe Room',
      type: 'DELUXE',
      capacity: 2,
      price: 150,
      amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom']
    },
    transaction: {
      amount: 300,
      currency: 'USD',
      status: 'COMPLETED',
      paymentMethod: 'Credit Card'
    }
  },
  {
    id: 2,
    roomId: 102,
    guestId: 2,
    startDate: today,
    endDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
    status: BookingStatus.CONFIRMED,
    paymentPlatformName: PaymentPlatformName.STRIPE,
    bookingKey: 'BK002',
    guest: {
      id: 2,
      name: 'Smith Family',
      email: 'smith@example.com',
      phone: '+1987654321',
      address: '456 Oak Ave, Town, Country'
    },
    room: {
      id: 102,
      name: 'Family Suite',
      type: 'FAMILY',
      capacity: 4,
      price: 250,
      amenities: ['WiFi', 'TV', 'AC', 'Kitchen', 'Living Room']
    },
    transaction: {
      amount: 750,
      currency: 'USD',
      status: 'COMPLETED',
      paymentMethod: 'Credit Card'
    }
  },
  // April 18th bookings
  {
    id: 3,
    roomId: 103,
    guestId: 3,
    startDate: '2024-04-18',
    endDate: '2024-04-20',
    status: BookingStatus.CONFIRMED,
    paymentPlatformName: PaymentPlatformName.STRIPE,
    bookingKey: 'BK003',
    guest: {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1122334455',
      address: '789 Pine St, Village, Country'
    },
    room: {
      id: 103,
      name: 'Executive Suite',
      type: 'EXECUTIVE',
      capacity: 2,
      price: 200,
      amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Work Desk']
    },
    transaction: {
      amount: 400,
      currency: 'USD',
      status: 'COMPLETED',
      paymentMethod: 'Credit Card'
    }
  },
  {
    id: 4,
    roomId: 104,
    guestId: 4,
    startDate: '2024-04-18',
    endDate: '2024-04-19',
    status: BookingStatus.PENDING,
    paymentPlatformName: PaymentPlatformName.PAYPAL,
    bookingKey: 'BK004',
    guest: {
      id: 4,
      name: 'Robert Brown',
      email: 'robert@example.com',
      phone: '+5566778899',
      address: '321 Elm St, Town, Country'
    },
    room: {
      id: 104,
      name: 'Standard Room',
      type: 'STANDARD',
      capacity: 1,
      price: 100,
      amenities: ['WiFi', 'TV', 'AC']
    },
    transaction: {
      amount: 100,
      currency: 'USD',
      status: 'PENDING',
      paymentMethod: 'PayPal'
    }
  },
  {
    id: 5,
    roomId: 105,
    guestId: 5,
    startDate: '2024-04-18',
    endDate: '2024-04-21',
    status: BookingStatus.CONFIRMED,
    paymentPlatformName: PaymentPlatformName.STRIPE,
    bookingKey: 'BK005',
    guest: {
      id: 5,
      name: 'Maria Garcia',
      email: 'maria@example.com',
      phone: '+9988776655',
      address: '654 Maple Ave, City, Country'
    },
    room: {
      id: 105,
      name: 'Premium Room',
      type: 'PREMIUM',
      capacity: 2,
      price: 180,
      amenities: ['WiFi', 'TV', 'AC', 'Coffee Maker', 'Safe']
    },
    transaction: {
      amount: 540,
      currency: 'USD',
      status: 'COMPLETED',
      paymentMethod: 'Credit Card'
    }
  },
  // April 20th bookings
  {
    id: 6,
    roomId: 106,
    guestId: 6,
    startDate: '2024-04-20',
    endDate: '2024-04-22',
    status: BookingStatus.CONFIRMED,
    paymentPlatformName: PaymentPlatformName.STRIPE,
    bookingKey: 'BK006',
    guest: {
      id: 6,
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '+1122334455',
      address: '987 Cedar St, City, Country'
    },
    room: {
      id: 106,
      name: 'Luxury Suite',
      type: 'LUXURY',
      capacity: 2,
      price: 300,
      amenities: ['WiFi', 'TV', 'AC', 'Jacuzzi', 'Mini Bar', 'Room Service']
    },
    transaction: {
      amount: 600,
      currency: 'USD',
      status: 'COMPLETED',
      paymentMethod: 'Credit Card'
    }
  },
  {
    id: 7,
    roomId: 107,
    guestId: 7,
    startDate: '2024-04-20',
    endDate: '2024-04-23',
    status: BookingStatus.CONFIRMED,
    paymentPlatformName: PaymentPlatformName.STRIPE,
    bookingKey: 'BK007',
    guest: {
      id: 7,
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      phone: '+6677889900',
      address: '147 Oak St, Town, Country'
    },
    room: {
      id: 107,
      name: 'Family Room',
      type: 'FAMILY',
      capacity: 4,
      price: 220,
      amenities: ['WiFi', 'TV', 'AC', 'Kitchenette', 'Sofa Bed']
    },
    transaction: {
      amount: 660,
      currency: 'USD',
      status: 'COMPLETED',
      paymentMethod: 'Credit Card'
    }
  },
  {
    id: 8,
    roomId: 108,
    guestId: 8,
    startDate: '2024-04-20',
    endDate: '2024-04-21',
    status: BookingStatus.PENDING,
    paymentPlatformName: PaymentPlatformName.PAYPAL,
    bookingKey: 'BK008',
    guest: {
      id: 8,
      name: 'James Taylor',
      email: 'james@example.com',
      phone: '+3344556677',
      address: '258 Pine St, Village, Country'
    },
    room: {
      id: 108,
      name: 'Standard Room',
      type: 'STANDARD',
      capacity: 1,
      price: 100,
      amenities: ['WiFi', 'TV', 'AC']
    },
    transaction: {
      amount: 100,
      currency: 'USD',
      status: 'PENDING',
      paymentMethod: 'PayPal'
    }
  }
];

const FullCalendarTest = () => {
  // Transform the bookings into calendar events
  const events = sampleBookings.map(booking => ({
    id: booking.id.toString(),
    title: `Booking #${booking.bookingKey}`,
    start: booking.startDate,
    end: booking.endDate,
    extendedProps: {
      roomId: booking.roomId,
      guestId: booking.guestId,
      status: booking.status,
      paymentPlatform: booking.paymentPlatformName,
      bookingKey: booking.bookingKey,
      guest: booking.guest,
      room: booking.room,
      transaction: booking.transaction
    }
  }));

  const handleDateClick = (arg: any) => {
    console.log('Date clicked:', arg.dateStr);
  };

  const handleEventClick = (arg: any) => {
    const event = arg.event;
    const booking = event.extendedProps;
    
    // Create a modal or detailed view with all booking information
    console.log('Booking Details:', {
      bookingKey: booking.bookingKey,
      status: booking.status,
      dates: {
        start: event.start,
        end: event.end
      },
      guest: {
        name: booking.guest.name,
        email: booking.guest.email,
        phone: booking.guest.phone,
        address: booking.guest.address
      },
      room: {
        name: booking.room.name,
        type: booking.room.type,
        capacity: booking.room.capacity,
        price: booking.room.price,
        amenities: booking.room.amenities
      },
      payment: {
        platform: booking.paymentPlatform,
        amount: booking.transaction.amount,
        currency: booking.transaction.currency,
        status: booking.transaction.status,
        method: booking.transaction.paymentMethod
      }
    });
  };

  return (
    <section className="flex min-h-[100vh] flex-col justify-center bg-gray-100 p-5 align-middle lg:py-[3rem]">
      <div className="mx-auto w-full max-w-7xl rounded-lg bg-white p-4 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Bookings Calendar</h1>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,dayGridDay'
          }}
          views={{
            dayGridMonth: {
              titleFormat: { year: 'numeric', month: 'long' }
            },
            timeGridWeek: {
              titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
            },
            dayGridDay: {
              titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
            }
          }}
          events={events}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          height="auto"
          timeZone="UTC"
          initialDate={today}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
          }}
          eventContent={(eventInfo) => {
            const booking = eventInfo.event.extendedProps;
            return (
              <div className="m-1 rounded-lg border border-gray-200 bg-white p-2 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {eventInfo.event.title}
                  </span>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    booking.status === 'CONFIRMED' 
                      ? 'bg-green-100 text-green-800' 
                      : booking.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm">
                    <svg className="mr-1.5 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-gray-600">{booking.room.name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <svg className="mr-1.5 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-600">{booking.guest.name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <svg className="mr-1.5 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">
                      {booking.transaction.amount} {booking.transaction.currency}
                    </span>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
};

export default FullCalendarTest;

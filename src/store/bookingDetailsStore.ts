import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BookingDetails = {
  fullName: string;
  email: string;
  phoneNumber: string;
  numberOfGuest: number;
  specialRequest: string;
};

type Store = BookingDetails & {
  bookingDetails: BookingDetails;
};

type Actions = {
  setBookingDetails: (details: Partial<BookingDetails>) => void;
  resetBookingDetails: () => void;
};

const initialBookingDetails: BookingDetails = {
  fullName: '',
  email: '',
  phoneNumber: '',
  numberOfGuest: 1,
  specialRequest: '',
};

export const useBookingDetailsStore = create<Store & Actions>()(
  persist(
    (set) => ({
      ...initialBookingDetails,
      bookingDetails: initialBookingDetails,
      setBookingDetails: (details) =>
        set((state) => {
          const updatedDetails = { ...state, ...details };
          return {
            ...updatedDetails,
            bookingDetails: {
              fullName: updatedDetails.fullName,
              email: updatedDetails.email,
              phoneNumber: updatedDetails.phoneNumber,
              numberOfGuest: updatedDetails.numberOfGuest,
              specialRequest: updatedDetails.specialRequest,
            },
          };
        }),
      resetBookingDetails: () => 
        set({
          ...initialBookingDetails,
          bookingDetails: initialBookingDetails,
        }),
    }),
    {
      name: 'booking-details-storage',
    }
  )
);

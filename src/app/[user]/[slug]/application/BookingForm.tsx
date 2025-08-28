'use client';

import { useForm, Controller } from 'react-hook-form';
import TextInput from 'src/features/react-hook-form/TextField';
import TextArea from 'src/features/react-hook-form/TextArea';
import Button from 'src/components/Button';
import { useToastStore } from 'src/store/toastStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  BookingConfirmationEmailDto,
  CheckValidBooking,
  CheckValidBookingQuery,
  CheckValidBookingQueryVariables,
  FindRoomsByRoomIds,
  FindRoomsByRoomIdsQuery,
  FindRoomsByRoomIdsQueryVariables,
  Room,
  RoomCapacity,
  RoomStatus,
  SendMmailAfterBooking,
  SendMmailAfterBookingMutation,
  SendMmailAfterBookingMutationVariables,
  SignupUser,
  SignupUserMutation,
  SignupUserMutationVariables,
} from 'src/gql/graphql';
import { useEffect, useState } from 'react';
import { useUserStore } from 'src/store/userStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRoomStore } from 'src/store/roomStore';
import LoadingSpinner from 'src/components/Loading';
import { useBookingDetailsStore } from 'src/store/bookingDetailsStore';
import { enqueueSnackbar } from 'notistack';
interface BookingFormProps {
  hostelId: string;
  hostelSlug: string;
  // roomIds: string[];
  onSuccess: () => void;
  rooms: Array<{
    id: string;
    caption: string;
    capacity: RoomCapacity;
    roomNumber?: string | null;
    status: RoomStatus;
    attachBathroom?: boolean | null;
    image?: Array<{ url: string; id: string }> | null;
  }>;
}

interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  checkInDate: string | Date;
  checkOutDate: string | Date;
  numberOfGuests: number;
  specialRequests?: string;
  password?: string;
}

interface StepOneProps {
  control: any;
  handleSubmit: any;
  errors: any;
  onSubmit: (data: BookingFormData) => void;
  setValue: any;
  watch: any;
  getValues: any;
  roomIds: string[];
  checkInDateValue: string | Date;
  checkOutDateValue: string | Date;
  watchedNoOfGuests: number;
  watchedPhone: string;
  watchedEmail: string;

  handleCheckInDateChange: (date: string | Date) => void;
  handleCheckOutDateChange: (date: string | Date) => void;
}

export const BookingForm = ({ hostelId, hostelSlug, onSuccess, rooms }: BookingFormProps) => {
  const { roomIds } = useRoomStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData | null>(null);
  // const selectedRoom = rooms.find(room => roomIds.includes(room.id));
  const selectedRoom = rooms.map(room => roomIds.includes(room.id));
  const selectedRooms = rooms.filter(room => roomIds.includes(room.id)).map(room => room);
  const router = useRouter();

  const searchParams = useSearchParams();
  const checkInDate = searchParams.get('checkInDate')
    ? new Date(searchParams.get('checkInDate') ?? '')
    : new Date().toISOString().split('T')[0];
  const checkOutDate = searchParams.get('checkOutDate')
    ? new Date(searchParams.get('checkOutDate') ?? '')
    : new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

  const [checkInDateValue, setCheckInDateValue] = useState<string | Date>(checkInDate);
  const [checkOutDateValue, setCheckOutDateValue] = useState<string | Date>(checkOutDate);

  const handleCheckInDateChange = (date: string | Date) => {
    // setCheckInDateValue(date)
    const checkoutDate = new Date(checkOutDate);
    const dateString =
      date instanceof Date
        ? date.toISOString().split('T')[0]
        : new Date(date).toISOString().split('T')[0];
    // also change the search params
    window.location.href = `/hostel/${hostelSlug}/booking?checkInDate=${dateString}&checkOutDate=${checkoutDate.toISOString().split('T')[0]}`;
  };
  const handleCheckOutDateChange = (date: string | Date) => {
    // setCheckOutDateValue(date)
    const dateString =
      date instanceof Date
        ? date.toISOString().split('T')[0]
        : new Date(date).toISOString().split('T')[0];
    // also change the search params
    const checkInDate = new Date(checkInDateValue);
    const dateStringObj = new Date(dateString);
    if (dateStringObj <= checkInDate) {
      enqueueSnackbar('checkout-date must be greater than checkin-date', { variant: 'error' });
      return;
    }
    window.location.href = `/hostel/${hostelSlug}/booking?checkInDate=${checkInDate.toISOString().split('T')[0]}&checkOutDate=${dateString}`;
  };
  const { bookingDetails } = useBookingDetailsStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<BookingFormData>({
    defaultValues: {
      checkInDate:
        checkInDate instanceof Date ? checkInDate.toISOString().split('T')[0] : checkInDate,
      checkOutDate:
        checkOutDate instanceof Date ? checkOutDate.toISOString().split('T')[0] : checkOutDate,
      fullName: bookingDetails.fullName || '',
      email: bookingDetails.email || '',
      phone: bookingDetails.phoneNumber || '',
      numberOfGuests: bookingDetails.numberOfGuest || 1,
      specialRequests: bookingDetails.specialRequest || '',
    },
  });

  const watchedEmail = watch('email');
  const watchedPhone = watch('phone');
  const watchedNoOfGuests = watch('numberOfGuests');

  // new user id should be created if user isn't signed in during booking
  const mutateSignupRequest = useGraphqlClientRequest<
    SignupUserMutation,
    SignupUserMutationVariables
  >(SignupUser.loc?.source.body!);

  const { mutateAsync: signUp } = useMutation({ mutationFn: mutateSignupRequest });

  const onSubmit = async (data: BookingFormData) => {
    if (currentStep === 1) {
      if (data.password) {
        signUp({
          input: {
            email: data.email,
            fullName: data.fullName,
            userType: 'GUEST',
            password: data.password,
          },
        }).then(res => {
          if (res?.signupUser?.id) {
            enqueueSnackbar('User signed in successfully.', { variant: 'success' });
          } else {
            enqueueSnackbar('please check your email.', { variant: 'error' });
            setCurrentStep(1);

            return;
          }
        });
      }
      if (data.phone.length != 10) return;
      setFormData(data);
      setCurrentStep(2);
    } else {
      try {
        // Here you would typically make the API call to create the booking
        enqueueSnackbar('Booking successfull.', { variant: 'success' });
      } catch {
        enqueueSnackbar('Failed. Please try again.', { variant: 'error' });
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div>
   

      {currentStep === 1 ? (
        <StepOne
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          setValue={setValue}
          watch={watch}
          getValues={getValues}
          watchedPhone={watchedPhone}
          watchedEmail={watchedEmail}
          watchedNoOfGuests={watchedNoOfGuests}
          roomIds={roomIds}
          checkInDateValue={checkInDateValue}
          checkOutDateValue={checkOutDateValue}
          handleCheckInDateChange={handleCheckInDateChange}
          handleCheckOutDateChange={handleCheckOutDateChange}
        />
      ) : (
        <StepTwo
          selectedRoom={selectedRoom}
          selectedRooms={selectedRooms}
          formData={formData}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          checkInDateValue={checkInDateValue}
          checkOutDateValue={checkOutDateValue}
        />
      )}
    </div>
  );
};

const StepOne = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  setValue,
  watch,
  getValues,
  checkInDateValue,
  checkOutDateValue,
  handleCheckInDateChange,
  handleCheckOutDateChange,
  watchedEmail,
  watchedNoOfGuests,
  watchedPhone,
}: StepOneProps) => {
  const { user } = useUserStore();
  const { roomIds } = useRoomStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setBookingDetails, resetBookingDetails, bookingDetails } = useBookingDetailsStore();

  const handleErrorMessages = () => {
    if (
      watchedEmail &&
      !/^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"[^"]+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
        watchedEmail,
      )
    ) {
      return 'Invalid email address.';
    }
    if (watchedPhone && watchedPhone.length != 10) return 'Invalid phone number.';
    return false;
  };
  // Check for validity here.

  const queryValidity = useGraphqlClientRequest<
    CheckValidBookingQuery,
    CheckValidBookingQueryVariables
  >(CheckValidBooking.loc?.source?.body!);

  const fetchData = async () => {
    const res = await queryValidity({
      roomIds: roomIds.map(id => parseInt(id)),
      startDate: new Date(checkInDateValue),
      endDate: new Date(checkOutDateValue),
    });
    return res.checkValidBooking;
  };
  const { data: validity, isLoading } = useQuery({
    queryKey: ['checkValidBooking', roomIds, checkInDateValue, checkOutDateValue],
    queryFn: fetchData,
    enabled: roomIds.length > 0 && !!checkInDateValue && !!checkOutDateValue,
  });

  useEffect(() => {
    setValue('fullName', user.userName);
    setValue('email', user.userEmail);
  }, []);

  const handleFullNameChange = (name: string) => {
    // validate the name
    setBookingDetails({
      ...bookingDetails,
      fullName: name,
    });
    setValue('fullName', name);
  };

  const handleEmailChange = (email: string) => {
    // validate the email
    setBookingDetails({
      ...bookingDetails,
      email: email,
    });
    setValue('email', email);
  };

  const handlePhoneChange = (phone: string) => {
    // validate the phone
    setBookingDetails({
      ...bookingDetails,
      phoneNumber: phone,
    });
    setValue('phone', phone);
  };

  const handleNumberOfGuestChange = (guest: string) => {
    // validate the number of guests
    setBookingDetails({
      ...bookingDetails,
      numberOfGuest: Number(guest),
    });
    setValue('numberOfGuests', Number(guest));
  };

  const handleSpecialRequestChange = (request: string) => {
    // validate the special request
    setBookingDetails({
      ...bookingDetails,
      specialRequest: request,
    });
    setValue('specialRequests', request);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {isLoading && <LoadingSpinner color="primary" size="sm" key={'load-booking-spinner'} />}

      {!validity?.isValid ? (
        <div className="bg-red-50 mb-4 rounded-md border-l-4 border-error p-4 shadow-md">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-red-500 h-6 w-6 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-error">Room Unavailable</h3>
              <div className="mt-1">
                <p className="text-error">Room is already booked for the selected dates.</p>
                {/* <p className="font-medium text-error/80 mt-1">{validity?.message}</p> */}
              </div>
            </div>
          </div>
        </div>
      ) : validity ? (
        <div className="mb-4 rounded-md border-l-4 border-success bg-emerald-50 p-4 shadow-md">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6  w-6 shrink-0 text-success"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <div className="flex w-full items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-success">Room Available!</h3>
                  <p className="text-success">{validity.message}</p>
                </div>
                <div>
                  <div className="stats stats-vertical mt-2 bg-white shadow lg:stats-horizontal">
                    <div className="stat">
                      <div className="stat-title text-gray-600">Duration</div>
                      <div className="stat-value text-base text-success">
                        {validity.totalDays} Days
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-gray-600">Total Price</div>
                      <div className="stat-value text-base text-success">
                        NPR {validity.totalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-4 border-t border-gray-300 pt-4 md:grid-cols-2">
        <TextInput
          name="fullName"
          type="text"
          customType="name"
          placeholder="Full Name"
          control={control}
          label="Full Name"
          required
          helpertext={errors.fullName?.type === 'required' ? 'Name is required' : ''}
          error={!!errors.fullName}
          value={bookingDetails.fullName || user.userName}
          onChange={e => handleFullNameChange(e.target.value)}
        />

        <TextInput
          name="email"
          type="email"
          customType="email"
          placeholder="Email Address"
          control={control}
          label="Email Address"
          required
          helpertext={errors.email?.type === 'required' ? 'Email is required' : ''}
          error={!!errors.email}
          value={bookingDetails.email || user.userEmail}
          onChange={e => handleEmailChange(e.target.value)}
        />

        <TextInput
          name="phone"
          type="tel"
          customType="tel"
          placeholder="Phone Number"
          control={control}
          label="Phone Number"
          required
          helpertext={errors.phone?.type === 'required' ? 'Phone number is required' : ''}
          error={!!errors.phone}
          value={bookingDetails.phoneNumber}
          onChange={e => handlePhoneChange(e.target.value)}
        />

        <TextInput
          name="numberOfGuests"
          type="number"
          customType="number"
          placeholder="Number of Guests"
          control={control}
          min={0}
          max={100}
          label="Number of Guests"
          required
          helpertext={
            errors.numberOfGuests?.type === 'required' ? 'Number of guests is required' : ''
          }
          error={!!errors.numberOfGuests}
          value={bookingDetails.numberOfGuest}
          onChange={e => handleNumberOfGuestChange(e.target.value)}
        />

        <TextInput
          name="checkInDate"
          type="date"
          placeholder="Check-in Date"
          control={control}
          label="Check-in Date"
          // required
          helpertext={errors.checkInDate?.type === 'required' ? 'Check-in date is required' : ''}
          error={!!errors.checkInDate}
          value={
            checkInDateValue instanceof Date
              ? checkInDateValue.toISOString().split('T')[0]
              : checkInDateValue
          }
          min={
            checkInDateValue instanceof Date
              ? checkInDateValue.toISOString().split('T')[0]
              : checkInDateValue
          }
          onChange={e => handleCheckInDateChange(e.target.value)}
        />

        <TextInput
          name="checkOutDate"
          type="date"
          placeholder="Check-out Date"
          control={control}
          label="Check-out Date"
          // required
          helpertext={errors.checkOutDate?.type === 'required' ? 'Check-out date is required' : ''}
          error={!!errors.checkOutDate}
          value={
            checkOutDateValue instanceof Date
              ? checkOutDateValue.toISOString().split('T')[0]
              : checkOutDateValue
          }
          onChange={e => handleCheckOutDateChange(e.target.value)}
        />
      </div>

      <TextArea
        name="specialRequests"
        placeholder="Special Requests"
        control={control}
        label="Special Requests"
        rows={3}
        error={!!errors.specialRequests}
        value={bookingDetails.specialRequest}
        onChange={e => handleSpecialRequestChange(e.target.value)}
      />

      {!user.userId && (
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <h3>Please Enter the password for customer Creation</h3>
          </div>
          <TextInput
            name="password"
            type="password"
            min={8}
            placeholder="Password"
            control={control}
            label="Password"
            required
            helpertext={errors.password?.type === 'required' ? 'Password is required' : ''}
            error={!!errors.password}
          />
        </div>
      )}
      {handleErrorMessages() && (
        <div>
          <p className="text-error">{handleErrorMessages()}</p>
        </div>
      )}
      {!handleErrorMessages() && (
        <div className="mt-6">
          <Button
            label="Next"
            type="submit"
            loading={false}
            className="w-full font-teko font-bold"
            disabled={!validity?.isValid}
          />
        </div>
      )}
    </form>
  );
};
interface StepTwoProps {
  selectedRoom: any;
  selectedRooms:
    | Array<{
        id: string;
        caption: string;
        capacity: RoomCapacity;
        roomNumber?: string | null;
        status: RoomStatus;
        attachBathroom?: boolean | null;
        image?: Array<{ url: string; id: string }> | null;
      }>
    | void[];
  formData: BookingFormData | null;
  handleBack: () => void;
  handleSubmit: any;
  onSubmit: (data: BookingFormData) => void;
  checkInDateValue: string | Date;
  checkOutDateValue: string | Date;
}

const paymentMethods = [
  {
    key: 'stripe',
    label: 'Pay with Stripe',
    img: 'https://logowik.com/content/uploads/images/stripe1461.jpg',
  },
  {
    key: 'khalti',
    label: 'Pay with Khalti',
    img: 'https://seeklogo.com/images/K/khalti-logo-FA9A5E5C5B-seeklogo.com.png',
  },
  {
    key: 'esewa',
    label: 'Pay with eSewa',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Esewa_logo.png',
  },
];

const StepTwo = ({
  selectedRoom,
  selectedRooms,
  formData,
  handleBack,
  handleSubmit,
  onSubmit,
  checkInDateValue,
  checkOutDateValue,
}: StepTwoProps) => {
  const { user } = useUserStore();
  const { roomIds } = useRoomStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>('stripe');
  const queryValidity = useGraphqlClientRequest<
    CheckValidBookingQuery,
    CheckValidBookingQueryVariables
  >(CheckValidBooking.loc?.source?.body!);

  const [isPaymentUrlLoading, setIsPaymentUrlLoading] = useState(false);

  const fetchData = async () => {
    const res = await queryValidity({
      roomIds: roomIds.map(id => parseInt(id)),
      startDate: new Date(checkInDateValue),
      endDate: new Date(checkOutDateValue),
    });
    return res.checkValidBooking;
  };
  const { data: validity, isLoading } = useQuery({
    queryKey: ['checkValidBooking', roomIds, checkInDateValue, checkOutDateValue],
    queryFn: fetchData,
    enabled: roomIds.length > 0 && !!checkInDateValue && !!checkOutDateValue,
  });

  // graphql for emailSendAfterBooking Query
  const sendEmail = useGraphqlClientRequest<
    SendMmailAfterBookingMutation,
    SendMmailAfterBookingMutationVariables
  >(SendMmailAfterBooking.loc?.source.body!);
  const { mutateAsync: sendEmailAfterSuccessfullBooking } = useMutation({ mutationFn: sendEmail });

  // get room and hostel details
  const fetchRoomDetails = useGraphqlClientRequest<
    FindRoomsByRoomIdsQuery,
    FindRoomsByRoomIdsQueryVariables
  >(FindRoomsByRoomIds.loc?.source.body!);
  const numericRoomIds: number[] = roomIds.map(id => Number(id));
  const queryFetchRoomDetailsFunc = async () => {
    const res = await fetchRoomDetails({ roomIds: numericRoomIds });
    return res.findRoomsByRoomIds;
  };

  const { data: RoomDetails } = useQuery({
    queryKey: ['roomDetails'],
    queryFn: queryFetchRoomDetailsFunc,
  });

  const handleCheckout = async () => {
    if (!selectedPaymentMethod) return;
    setIsPaymentUrlLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          amount: Number(validity?.totalPrice) * 100,
          currency: 'NPR',
          roomIds: roomIds,
          quantity: 1,
          guestId: user.userId,
          customerEmail: formData?.email,
          customerName: formData?.fullName,
          customerPassword: formData?.password,

          startDate: formData?.checkInDate,
          endDate: formData?.checkOutDate,

          paymentMethod: selectedPaymentMethod,
        }),
      },
    );
    const emailSent = await sendEmailAfterSuccessfullBooking({
      email: formData?.email ?? '',
      data: {
        checkInDate: String(formData?.checkInDate),
        checkOutDate: String(formData?.checkOutDate),
        roomName: RoomDetails?.roomNumbers ?? [],
        guestName: 'guest',
        hostelName: RoomDetails?.name ?? '',
        paidAmount: validity?.totalPrice ?? 0,
      },
    });
    if (emailSent.sendMailAfterBooking) {
      enqueueSnackbar('Please check your mail.', { variant: 'success' });
    } else {
      enqueueSnackbar('Error in sending mail.', { variant: 'error' });
    }
    setIsPaymentUrlLoading(false);
    const data = await response.json();
    if (data.url) {
      window.open(data.url, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-base-100 p-4">
        <h3 className="mb-2 font-semibold">Selected Room</h3>
        <div className="grid grid-cols-2 gap-2">
          {selectedRooms.map(selRoom => (
            <div key={`selRoom-${selRoom?.caption}`}>
              <p className="text-base font-semibold">{selRoom?.caption}</p>
              <p className="text-xs">
                Capacity: <span className="text-gray-700">{selRoom?.capacity}</span>
              </p>
              {/* {selRoom?.roomNumber && <p>Room Number: {selRoom.roomNumber}</p>} */}
              {selRoom?.attachBathroom && <p>With Attached Bathroom</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-base-100 p-4">
        <h3 className="mb-2 font-semibold">Booking Details</h3>
        <strong>Name:</strong>
        <span> {formData?.fullName}</span>
        <br />
        <strong>Email:</strong>
        <span> {formData?.email}</span>
        <br />
        <strong>Phone:</strong>
        <span> {formData?.phone}</span>
        <br />
        <strong>Number of Guests:</strong>
        <span> {formData?.numberOfGuests}</span>
        <br />
        <strong>Check-in Date:</strong>
        <span>
          {' '}
          {checkInDateValue instanceof Date
            ? checkInDateValue.toISOString().split('T')[0]
            : checkInDateValue}
        </span>
        <br />
        <strong>Check-out Date:</strong>
        <span>
          {' '}
          {checkOutDateValue instanceof Date
            ? checkOutDateValue.toISOString().split('T')[0]
            : checkOutDateValue}
        </span>
        <br />
        {formData?.specialRequests && (
          <>
            <strong>Special Requests:</strong>
            <span> {formData.specialRequests}</span>
          </>
        )}
      </div>
      <div className="rounded-lg bg-base-100 p-4">
        <h3 className="mb-2 font-semibold">Payment Details</h3>
        <strong>Total Days:</strong>
        <span> {validity?.totalDays}</span>
        <br />
        <strong>Total Price:</strong>
        <span> NPR {validity?.totalPrice}</span>
      </div>

      {/* Payment method */}
      <div className="rounded-lg bg-base-100 p-4 shadow-md">
        <h3 className="mb-4 text-lg font-semibold">Select Payment Method</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {paymentMethods.map(method => (
            <button
              key={method.key}
              type="button"
              onClick={() => setSelectedPaymentMethod(method.key)}
              className={`flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all duration-150
                ${selectedPaymentMethod === method.key ? 'border-primary bg-primary/10 ring-2 ring-primary' : 'border-gray-200 hover:border-primary'}`}
            >
              <img src={method.img} alt={method.label} className="mb-2 h-10 object-contain" />
              <span
                className={`font-medium ${selectedPaymentMethod === method.key ? 'text-primary' : 'text-gray-700'}`}
              >
                {method.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          label="Back"
          type="button"
          variant="outlined"
          onClick={handleBack}
          className="flex-1 text-black"
        />
        <Button
          label="Pay and Confirm Booking"
          type="button"
          onClick={handleCheckout}
          className="flex-1"
          disabled={!selectedPaymentMethod || isPaymentUrlLoading}
          loading={isPaymentUrlLoading}
        />
      </div>
    </div>
  );
};

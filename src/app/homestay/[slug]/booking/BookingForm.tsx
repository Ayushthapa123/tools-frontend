'use client';

import { useForm, Controller } from 'react-hook-form';
import TextInput from 'src/features/react-hook-form/TextField';
import TextArea from 'src/features/react-hook-form/TextArea';
import Button from 'src/components/Button';
import { useToastStore } from 'src/store/toastStore';
import { useMutation } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { Room, RoomCapacity, RoomStatus } from 'src/gql/graphql';
import { useEffect, useState } from 'react';
import { useUserStore } from 'src/store/userStore';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'next/navigation';
interface BookingFormProps {
  homestayId: string;
  roomId: string;
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
  checkInDate: string;
  checkOutDate: string;
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
}

const StepOne = ({ control, handleSubmit, errors, onSubmit ,setValue,watch,getValues}: StepOneProps) => {
  
  const { user } = useUserStore();


  useEffect(() => {
    if (user.userId) {
      setValue('fullName', user.userName);
      setValue('email', user.userEmail);
    }
  }, [user.userId, setValue, user.userName, user.userEmail]);
  

  const checkInDateValue = watch('checkInDate');
  const checkOutDateValue = watch('checkOutDate');
  return (
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextInput
        name="fullName"
        type="text"
        placeholder="Full Name"
        control={control}
        label="Full Name"
        required
        helpertext={errors.fullName?.type === 'required' ? 'Name is required' : ''}
        error={!!errors.fullName}
      />

      <TextInput
        name="email"
        type="email"
        placeholder="Email Address"
        control={control}
        label="Email Address"
        required
        helpertext={errors.email?.type === 'required' ? 'Email is required' : ''}
        error={!!errors.email}
      />

      <TextInput
        name="phone"
        type="tel"
        placeholder="Phone Number"
        control={control}
        label="Phone Number"
        required
        helpertext={errors.phone?.type === 'required' ? 'Phone number is required' : ''}
        error={!!errors.phone}
      />

      <TextInput
        name="numberOfGuests"
        type="number"
        placeholder="Number of Guests"
        control={control}
        label="Number of Guests"
        required
        helpertext={errors.numberOfGuests?.type === 'required' ? 'Number of guests is required' : ''}
        error={!!errors.numberOfGuests}
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
        value={watch('checkInDate')??checkInDateValue}

        min={checkInDateValue}
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
        value={checkOutDateValue}
        min={checkInDateValue}
      />
    </div>

    <TextArea
      name="specialRequests"
      placeholder="Special Requests"
      control={control}
      label="Special Requests"
      rows={3}
      error={!!errors.specialRequests}
    />

{ !user.userId&&<div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <h3>Please Enter the password for customer Creation</h3>
    </div>
    <TextInput
      name="password"
      type="password"
      placeholder="Password"  
      control={control}
      label="Password"
      required
      helpertext={errors.password?.type === 'required' ? 'Password is required' : ''}
      error={!!errors.password}
    />
    </div>}

    <div className="mt-6">
      <Button
        label="Next"
        type="submit"
        loading={false}
        className="w-full"
      />
    </div>
  </form>
);
}
interface StepTwoProps {
  selectedRoom: any;
  formData: BookingFormData | null;
  handleBack: () => void;
  handleSubmit: any;
  onSubmit: (data: BookingFormData) => void;
}

const StepTwo = ({ selectedRoom, formData, handleBack, handleSubmit, onSubmit }: StepTwoProps) => {
  const { user } = useUserStore();
  const handleCheckout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: (selectedRoom?.price?.amount * 100) || 10000,
        currency: 'NPR',
        roomId: selectedRoom?.id ?? "1",
        quantity: 1,
        bookingKey: uuidv4(),
        guestId: user.userId??1,
        startDate: formData?.checkInDate,
        endDate: formData?.checkOutDate,
        customerEmail: formData?.email??"test@test.com",
        customerPassword: formData?.password,
         
      }),
    });
    const data = await response.json();
    if (data.url) {
      window.open(data.url, '_blank');
    }
  };

  return (
    <div className="space-y-6">

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Selected Room</h3>
        <p>{selectedRoom?.caption}</p>
        <p>Capacity: {selectedRoom?.capacity}</p>
        {selectedRoom?.roomNumber && <p>Room Number: {selectedRoom.roomNumber}</p>}
        {selectedRoom?.attachBathroom && <p>With Attached Bathroom</p>}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Booking Details</h3>
        <p>Name: {formData?.fullName}</p>
        <p>Email: {formData?.email}</p>
        <p>Phone: {formData?.phone}</p>
        <p>Number of Guests: {formData?.numberOfGuests}</p>
        <p>Check-in Date: {formData?.checkInDate}</p>
        <p>Check-out Date: {formData?.checkOutDate}</p>
        {formData?.specialRequests && (
          <p>Special Requests: {formData.specialRequests}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          label="Back"
          type="button"
          variant="outlined"
          onClick={handleBack}
          className="flex-1"
        />
        <Button
          label="Pay and Confirm Booking"
          type="button"
          // onClick={() => handleSubmit(onSubmit)()}
          onClick={handleCheckout}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export const BookingForm = ({ homestayId, roomId, onSuccess, rooms }: BookingFormProps) => {
  const { setMessage, setRole, setShowToast } = useToastStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData | null>(null);
  const selectedRoom = rooms.find(room => room.id === roomId);

  const searchParams = useSearchParams();
  const checkInDate = searchParams.get('checkInDate') ?? new Date().toISOString().split('T')[0];
  const checkOutDate = searchParams.get('checkOutDate') ?? new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
 


  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues
  } = useForm<BookingFormData>({
    defaultValues: {
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    if (currentStep === 1) {
      setFormData(data);
      setCurrentStep(2);
    } else {
      try {
        // Here you would typically make the API call to create the booking
        setMessage('Booking successful!');
        setRole('success');
        setShowToast(true);
        onSuccess();
      } catch (error) {
        setMessage('Failed to create booking. Please try again.');
        setRole('error');
        setShowToast(true);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Step {currentStep} of 2</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${(currentStep / 2) * 100}%` }}
          />
        </div>
      </div>

      {currentStep === 1 ? (
        <StepOne
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          setValue={setValue}
          watch={watch}
          getValues={getValues}
        />
      ) : (
        <StepTwo
          selectedRoom={selectedRoom}
          formData={formData}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}; 
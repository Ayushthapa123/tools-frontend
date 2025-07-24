'use client';
import TextInput from 'src/features/react-hook-form/TextField';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextArea from 'src/features/react-hook-form/TextArea';
import {
  Gender,
 
  HostelType,
  RoomCapacity,
  CreateHostelApplicationFormInput,
  CreateHostelApplicationFormMutation,
  CreateHostelApplicationForm,
  CreateHostelApplicationFormMutationVariables,
} from 'src/gql/graphql';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { enqueueSnackbar } from 'notistack';
import { useUserStore } from 'src/store/userStore';
import Button from 'src/components/Button';
import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { BiLeftArrow } from 'react-icons/bi';
interface GuestFormProps {
  isEdit?: boolean;
  withToken?: boolean;
  slug: string;
  hostelId: number;
}

export const ApplicationForm = ({ isEdit = false, withToken = false, slug, hostelId }: GuestFormProps) => {

  const [isCompleted, setIsCompleted] = useState(false);
  const [askForDiscount, setAskForDiscount] = useState(true);

  const {user} = useUserStore();


  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateHostelApplicationFormInput>({
    defaultValues: {
      fullName:user.userName,
      email:user.userEmail, 
    
    },
  });


  const mutateHostelApplicationForm = useGraphqlClientRequest<
    CreateHostelApplicationFormMutation,
    CreateHostelApplicationFormMutationVariables
  >(CreateHostelApplicationForm.loc?.source.body!);

  const { mutateAsync, isPending } = useMutation({ mutationFn: mutateHostelApplicationForm });

  const onSubmit = async (data: CreateHostelApplicationFormInput) => {
 
    const input = { ...data };

    mutateAsync({
      createHostelApplicationFormInput: {
        ...input,
        askForDiscount: askForDiscount, 
        hostelId: hostelId,
        checkinDate: input.checkinDate ? new Date(input.checkinDate).toISOString() : null,
        checkoutDate: input.checkoutDate ? new Date(input.checkoutDate).toISOString() : null,

       
      },
    }).then(res => {
      if (res?.createHostelApplicationForm?.data?.id) {
        enqueueSnackbar('Form created successfully.', { variant: 'success' });
        // queryClient.invalidateQueries({ queryKey: ['getHostelGuests'] });
        // router.push(`/app/hostel-guests`);
        setIsCompleted(true);
      } else {
        enqueueSnackbar('Something went wrong.', { variant: 'error' });
      }
    });
  };


  const roomCapacityOptions = [
    { label: '1 Seater', value: RoomCapacity.OneBed },
    { label: '2 Seater', value: RoomCapacity.TwoBed },
    { label: '3 Seater', value: RoomCapacity.ThreeBed },
    { label: '4 Seater', value: RoomCapacity.FourBed },
    { label: '5 Seater', value: RoomCapacity.FiveBed },
    { label: 'Multi Bed', value: RoomCapacity.MultiBed },
   
 
    
  ];

  const buttonText = isEdit ? 'Update Form' : 'Submit Form';



  return (
    <>
      {isCompleted ? (
        <div className="from-green-50 to-green-100 animate-fade-in flex flex-col items-center justify-center rounded-lg  py-16 ">
          <div className=" animate-bounce-slow mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-md  ">
            <svg
              className="text-green-600 h-12 w-12"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeOpacity="0.2"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 13.5l3 3.5L17 9"
                className="animate-draw-check"
              />
            </svg>
          </div>
          <h3 className="text-green-800 mb-2 text-3xl font-bold drop-shadow">
            Submission Successful!
          </h3>
          <p className="mb-1 text-lg text-gray-700">
            Your application has been submitted successfully. Also,you can check the status of your
            form in{' '}
            <Link href="/app/my-profile" className="text-blue-500 hover:underline">
              Hostel Guest Login
            </Link>
          </p>
          <p className="text-gray-600">We appreciate your interest and will contact you soon.</p>
          <Link
            href="/search"
            className="bg-green-500 hover:bg-green-600 mt-6  rounded px-6 py-2 font-semibold  shadow transition"
          >
            Back to Search Page
          </Link>
          <br/>
          <Link
            href="/app/my-profile"
            className="bg-green-500 hover:bg-green-600 mt-6  rounded px-6 py-2 font-semibold  shadow transition"
          >
            Back to My Profile
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <div className=" flex flex-col ">
                <h3 className="text-3xl font-bold text-gray-500">Contact Details</h3>
              </div>

              <div className="grid h-auto w-full gap-5 md:grid-cols-2">
                <div>
                  <TextInput
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    control={control}
                    label="Full Name"
                    required
                    helpertext={errors.fullName?.type === 'required' ? 'Full Name Is Required' : ''}
                    error={!!errors.fullName}
                  />
                </div>
                <div>
                  <TextInput
                    name="email"
                    type="text"
                    placeholder="Email"
                    control={control}
                    label="Email"
                    error={!!errors.email}
                    required
                    helpertext={errors.email?.type === 'required' ? 'Email Is Required' : ''}
                  />
                </div>

                <div>
                  <TextInput
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    control={control}
                    label="Phone Number"
                    required
                    helpertext={
                      errors.phoneNumber?.type === 'required' ? 'Phone Number Is Required' : ''
                    }
                    error={!!errors.phoneNumber}
                  />
                </div>
                <div>
                  <TextInput
                    name="permanentAddress"
                    type="text"
                    placeholder="Permanent Address"
                    control={control}
                    label="Home Address"
                    required
                    helpertext={
                      errors.permanentAddress?.type === 'required' ? 'Permanent Address Is Required' : ''
                    }
                    error={!!errors.permanentAddress}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className=" mt-4 flex flex-col ">
                <h3 className="text-3xl font-bold text-gray-500">Other Details</h3>
              </div>

              <div className="  grid h-auto w-full gap-5 ">
             
                <div>
                  <ReactSelect
                    name="roomCapacity"
                    placeholder="Room Capacity"
                    control={control}
                    options={roomCapacityOptions}
                    label="Room Capacity"
                    required
                    helperText={
                      errors.roomCapacity?.type === 'required' ? 'Room Capacity Is Required' : ''
                    }
                    error={!!errors.roomCapacity}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
              <div className="mt-4">
                <TextInput
                  name="occupation"
                  type="text"
                  placeholder="Student,Professional,etc"
                  control={control}
                  label="Your Occupation"
                  required
                  helpertext={
                    errors.occupation?.type === 'required' ? 'Occupation Is Required' : ''
                  }
                  error={!!errors.occupation}
                />
              </div>
              <div className="mt-4">
                <TextInput
                  name="institutionName"
                  type="text"
                  placeholder="Institution Name"
                  control={control}
                  label="Institution/Company Name"
                  required
                  helpertext={
                    errors.institutionName?.type === 'required' ? 'Institution Name Is Required' : ''
                  }
                  error={!!errors.institutionName}
                />
              </div>
              </div>
            
              <div className="mt-4 grid grid-cols-2 gap-4"> 
              <TextInput
                  name="checkinDate"
                  type="date"
                  placeholder="Checkin Date"
                  control={control}
                  label="Checkin Date"
                  required
                  helpertext={
                    errors.checkinDate?.type === 'required' ? 'Checkin Date Is Required' : ''
                  }
                  error={!!errors.checkinDate}
                />
                <TextInput
                  name="checkoutDate"
                  type="date"
                  placeholder="Checkout Date"
                  control={control}
                  label="Checkout Date"
                  // required
                  helpertext={
                    errors.checkoutDate?.type === 'required' ? 'Checkout Date Is Required' : ''
                  }
                  error={!!errors.checkoutDate}
                />
              </div>
              <div className="mt-4">
                <TextArea
                  name="notes"
                  placeholder="Notes"
                  error={!!errors.notes}
                  control={control}
                  label="Special Notes For Hostel"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {!user.userEmail && (
            <div className="mb-4 mt-4">
              <label className="flex items-center space-x-2">
                {/* <input
                  type="checkbox"
                  checked={alsoCreateAccount}
                  onChange={e => setAlsoCreateAccount(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-primary"
              /> */}
              <span>We will create an account if not exist</span>
            </label>
          </div>
          )}

          {!user.userEmail && (
            <div className="mt-4">
              <TextInput
                name="password"
                placeholder="Password"
                error={!!errors.password}
                control={control}
                label="Password"
                type="password"
              />
            </div>
          )}
          <div> 
          <div className="mb-4 mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={askForDiscount}
                  onChange={e => setAskForDiscount(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-primary"
              />
              <span>Ask for Discount in admission fee</span>
            </label>
          </div>
          </div>

          <div className="flex justify-end">
            <div className="mt-6 flex justify-end gap-2">
              <Button
                type="submit"
                className={`btn btn-primary w-min`}
                label={buttonText}
                loading={isPending}
              />
            </div>
          </div>
        </form>
      )}
    </>
  );
};

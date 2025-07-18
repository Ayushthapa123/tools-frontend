'use client';
import TextInput from 'src/features/react-hook-form/TextField';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextArea from 'src/features/react-hook-form/TextArea';
import {
  HostelGuestData,
  Gender,
  CreateHostelSearchFormMutationVariables,
  CreateHostelSearchFormMutation,
  CreateHostelSearchForm,
  HostelGenderType,
  HostelType,
  CreateHostelSearchFormInput,
  RoomCapacity,
} from 'src/gql/graphql';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { enqueueSnackbar } from 'notistack';
import { useUserStore } from 'src/store/userStore';
import Button from 'src/components/Button';
import { useEffect, useMemo, useState } from 'react';
import {
  CreateHostelGuest,
  CreateHostelGuestMutation,
  CreateHostelGuestMutationVariables,
} from 'src/gql/graphql';
import { countries } from 'src/app/app/data/countries';
import ImageUploader from 'src/features/ImageUploader';
import { MapProvider } from 'src/features/MapProvider';
import { MapComponent } from 'src/app/app/hostel-info/MapComponent';
import { ReverseGeoDataType } from 'src/app/app/hostel-info/CreateHostelModal';
import Link from 'next/link';
import { BiLeftArrow } from 'react-icons/bi';
interface GuestFormProps {
  guest?: HostelGuestData;
  isEdit?: boolean;
  withToken?: boolean;
}

export const SearchForm = ({ guest, isEdit = false, withToken = false }: GuestFormProps) => {

  const [alsoCreateAccount, setAlsoCreateAccount] = useState(!isEdit);
  const [isCompleted, setIsCompleted] = useState(false);

  const {user} = useUserStore();

  const [clickedLatLng, setClickedLatLng] = useState<{
    lat: number | null;
    lng: number | null;
  } | null>({ lat: null, lng: null });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateHostelSearchFormInput>({
    defaultValues: {},
  });

  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const handleProfilePicture = (url: string | null) => {
    setProfilePicture(url);
  };

  const mutateCreateGuest = useGraphqlClientRequest<
    CreateHostelSearchFormMutation,
    CreateHostelSearchFormMutationVariables
  >(CreateHostelSearchForm.loc?.source.body!);

  const { mutateAsync, isPending } = useMutation({ mutationFn: mutateCreateGuest });

  const onSubmit = async (data: CreateHostelSearchFormInput) => {
    if (!clickedLatLng?.lat || !clickedLatLng?.lng) {
      enqueueSnackbar('Please select the location first.', { variant: 'error' });
      return;
    }
    const input = { ...data };

    mutateAsync({
      createHostelSearchFormInput: {
        ...input,
        address: {
          ...input.address,
          latitude: clickedLatLng.lat,
          longitude: clickedLatLng.lng,
          country: input.address?.country || '',
          city: input.address?.city || '',
          subCity: input.address?.subCity || '',
          street: input.address?.street || '',
        },
      },
    }).then(res => {
      if (res?.createHostelSearchForm?.data?.id) {
        enqueueSnackbar('Form created successfully.', { variant: 'success' });
        // queryClient.invalidateQueries({ queryKey: ['getHostelGuests'] });
        // router.push(`/app/hostel-guests`);
        setIsCompleted(true);
      } else {
        enqueueSnackbar('Something went wrong.', { variant: 'error' });
      }
    });
  };

  const genderOptions = [
    { label: 'Male', value: Gender.Boys },
    { label: 'Female', value: Gender.Girls },
    { label: 'Others', value: Gender.Others },
  ];

  const hostelTypeOptions = [
    { label: 'Stay', value: HostelType.Stay },
    { label: 'Travel', value: HostelType.Travel },
    { label: 'Both', value: HostelType.Both },

    { label: 'PG', value: HostelType.Pg },
  ];

  const roomCapacityOptions = [
    { label: '1 Seater', value: RoomCapacity.OneBed },
    { label: '2 Seater', value: RoomCapacity.TwoBed },
    { label: '3 Seater', value: RoomCapacity.ThreeBed },
    { label: '4 Seater', value: RoomCapacity.FourBed },
    { label: '5 Seater', value: RoomCapacity.FiveBed },
    { label: 'Multi Bed', value: RoomCapacity.MultiBed },
   
 
    
  ];

  const buttonText = isEdit ? 'Update Form' : 'Submit Form';

  const handleClickLatLng = (lat: number | null, lng: number | null) => {
    setClickedLatLng({ lat, lng });
  };
  const [reverseGeoData, setReverseGeoData] = useState<ReverseGeoDataType>();

  useEffect(() => {
    if (window?.google?.maps?.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode(
        { location: { lat: Number(clickedLatLng?.lat), lng: Number(clickedLatLng?.lng) } },
        (results, status) => {
          if (status === 'OK') {
            if (results?.[0]) {
              const splitedAddress = results[0].formatted_address.split(',');
              setReverseGeoData({
                geoCity: splitedAddress[splitedAddress.length - 2].split(' ')[1],
                geoCounty: splitedAddress[splitedAddress.length - 1].trim(),
                geoStreet: splitedAddress[splitedAddress.length - 3],
              });
            } else {
            }
          } else {
          }
        },
      );
    }
  }, [clickedLatLng]);

  // setting default value in fields
  useEffect(() => {
    if (reverseGeoData?.geoCity) {
      setValue('address.city', reverseGeoData.geoCity);
    }
    if (reverseGeoData?.geoCounty) {
      setValue('address.country', reverseGeoData.geoCounty);
    }
    if (reverseGeoData?.geoStreet) {
      // setValue('address.street', reverseGeoData.geoStreet);
    }
  }, [reverseGeoData, setValue]);

  const countryOptions = useMemo(() => {
    return countries.map(country => ({
      label: country.name,
      value: country.name,
    }));
  }, []);

  return (
    <>
      {isCompleted ? (
        <div className="from-green-50 to-green-100 animate-fade-in flex flex-col items-center justify-center rounded-lg bg-gradient-to-br py-16 shadow-lg">
          <div className="bg-green-200 animate-bounce-slow mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-md">
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
            Initial Availability will be sent to your email. Also,you can check the status of your
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
              <h3>Please Select the location</h3>
            </div>
            <div>
              <MapProvider>
                <div className=" h-auto w-full">
                  <div className="relative mt-5 h-[300px] w-full overflow-hidden md:h-[480px]">
                    <MapComponent
                      clickedLatLng={clickedLatLng}
                      setClickedLatLng={handleClickLatLng}
                      lat={clickedLatLng?.lat}
                      lng={clickedLatLng?.lng}
                    />
                  </div>
                </div>
              </MapProvider>

              <div className="my-4 flex flex-col ">
                <h3 className="text-3xl font-bold text-gray-500">Address Details</h3>
              </div>

              <div className=" mt-5 grid h-auto w-full gap-5 md:grid-cols-2">
                <div>
                  <ReactSelect
                    name="address.country"
                    placeholder="Country"
                    control={control}
                    options={countryOptions}
                    label="Country"
                    required
                    helperText={
                      errors.address?.country?.type === 'required' ? 'Country Is Required' : ''
                    }
                    error={!!errors.address?.country}
                  />
                </div>

                <div>
                  <TextInput
                    name="address.city"
                    type="text"
                    placeholder="City"
                    control={control}
                    label="City"
                    required
                    helpertext={errors.address?.city?.type === 'required' ? 'City Is Required' : ''}
                    error={!!errors.address?.city}
                  />
                </div>
                <div>
                  <TextInput
                    name="address.subCity"
                    type="text"
                    placeholder="Sub City"
                    control={control}
                    label="Sub City"
                    error={!!errors.address?.subCity}
                  />
                </div>
                <div>
                  <TextInput
                    name="address.street"
                    type="text"
                    placeholder="Street"
                    control={control}
                    label="Street"
                    error={!!errors.address?.street}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="my-4 flex flex-col ">
                <h3 className="text-3xl font-bold text-gray-500">Contact Details</h3>
              </div>

              <div className=" mt-5 grid h-auto w-full gap-5 md:grid-cols-2">
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
                    // required
                    helpertext={
                      errors.phoneNumber?.type === 'required' ? 'Phone Number Is Required' : ''
                    }
                    error={!!errors.phoneNumber}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="my-4 flex flex-col ">
                <h3 className="text-3xl font-bold text-gray-500">Hostel Details</h3>
              </div>

              <div className=" mt-5 grid h-auto w-full gap-5 md:grid-cols-2">
                <div>
                  <ReactSelect
                    name="hostelGenderType"
                    placeholder="Hostel Gender Type"
                    control={control}
                    options={genderOptions}
                    label="Hostel Gender Type"
                    required
                    helperText={
                      errors.address?.country?.type === 'required' ? 'Country Is Required' : ''
                    }
                    error={!!errors.address?.country}
                  />
                </div>
                <div>
                  <ReactSelect
                    name="hostelType"
                    placeholder="Hostel Type"
                    control={control}
                    options={hostelTypeOptions}
                    label="Hostel Type"
                    required
                    helperText={
                      errors.address?.country?.type === 'required' ? 'Country Is Required' : ''
                    }
                    error={!!errors.address?.country}
                  />
                </div>
                <div>
                  <ReactSelect
                    name="roomCapacity"
                    placeholder="Room Capacity"
                    control={control}
                    options={roomCapacityOptions}
                    label="Room Capacity"
                    required
                    helperText={
                      errors.address?.country?.type === 'required' ? 'Country Is Required' : ''
                    }
                    error={!!errors.address?.country}
                  />
                </div>
              </div>
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

          {user.userEmail && (
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

          {user.userEmail && (
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

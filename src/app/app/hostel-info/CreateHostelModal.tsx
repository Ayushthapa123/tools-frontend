'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Button from 'src/components/Button';
import RichTextEditor from 'src/components/RichTextEditor';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextInput from 'src/features/react-hook-form/TextField';
import {
  AmenityOptionData,
  CreateOnboardingHostel,
  CreateOnboardingHostelInput,
  CreateOnboardingHostelMutation,
  CreateOnboardingHostelMutationVariables,
  HostelGenderType,
  HostelType,
} from 'src/gql/graphql';

import { MapProvider } from 'src/features/MapProvider';
import { useRouter } from 'next/navigation';
import { MapComponent } from './MapComponent';
import { countries } from '../data/countries';
import { HostelAmenitiesPage } from 'src/features/amenity/HostelAmenityPage';
import { useUserStore } from 'src/store/userStore';

export interface ReverseGeoDataType {
  geoCity: string | null;
  geoCounty: string | null;
  geoStreet: string | null;
}

export const CreateHostelModal = () => {
  const {
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit: handleSubmitForm,
  } = useForm<CreateOnboardingHostelInput>({
    defaultValues: {
      genderType: HostelGenderType.Boys,
    },
  });

    // For amenities
    const [selectedAmenities, setSelectedAmenities] = useState<AmenityOptionData[]>([]); 


  watch('genderType');
  watch('name');
  const descriptionRef = useRef('');

  useEffect(() => {
    // Open modal on mount
    // @ts-ignore
    document.getElementById('my_modal_4')?.showModal();
  }, []);

  const [hostelType, setHostelType] = useState<HostelType>(HostelType.Stay);
  const [hostelTypeErrorMessage, setHostelTypeErrorMessage] = useState('');
  const [steps, setSteps] = useState(0);

  const router = useRouter();

  const handleHostelType = (hType: HostelType) => {
    setHostelTypeErrorMessage('');
    setHostelType(hType);
  };

  const minusStep = () => {
    if (steps > 0) setSteps(steps - 1);
  };

  const queryClient = useQueryClient();
  const plusStep = () => {
    if (steps < 4) {
      setSteps(steps + 1);
    } else {
      enqueueSnackbar('Onboarding completed.', { variant: 'success' });
      // window.location.reload();
      router.push('/app/gallery');

      queryClient.refetchQueries();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const genderOptions = [
    { label: 'Boys', value: HostelGenderType.Boys },
    { label: 'Girls', value: HostelGenderType.Girls },
    { label: 'Both', value: HostelGenderType.Both },
  ];

  const mutateCreateHostelInfo = useGraphqlClientRequest<
    CreateOnboardingHostelMutation,
    CreateOnboardingHostelMutationVariables
  >(CreateOnboardingHostel.loc?.source.body!);

  const { mutateAsync: createHostel, isPending: isLoading } = useMutation({ mutationFn: mutateCreateHostelInfo });

  const handleSubmit = async (data: CreateOnboardingHostelInput) => {
    try {
      const res = await createHostel({
        input: {
          ...data,
          address: {
            ...data.address,
            country: data.address?.country || '',
            city: data.address?.city || '',
            subCity: data.address?.subCity || '',
            street: data.address?.street || '',
            latitude: clickedLatLng?.lat || 0,
            longitude: clickedLatLng?.lng || 0,
            hostelId: 0, // remove this from backend
          },
          contact: {
            ...data.contact,
            email: data.contact?.email || '',
            phone: data.contact?.phone || '',
            altPhone: data.contact?.altPhone || '',
            hostelId: 0, // remove this from backend
          },
          amenity: JSON.stringify(selectedAmenities),
          
        },
      });
      if (res?.createOnboardingHostel?.data?.id) {
        enqueueSnackbar('Hostel created successfully.', { variant: 'success' });
        router.push('/app/gallery');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        enqueueSnackbar('Something went wrong.', { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  };

  const isValid = Boolean(getValues('name') && getValues('genderType'));

  const hostelTypeData = [
    {
      label: 'Stay Hostel',
      value: HostelType.Stay,
      image: '/images/hostelTypes/stay.jpg',
    },
    {
      label: 'Travel Hostel',
      value: HostelType.Travel,
      image: '/images/hostelTypes/travel.jpg',
    },
    {
      label: 'PG',
      value: HostelType.Pg,
      image: '/images/hostelTypes/pg.jpg',
    },
    {
      label: 'Travel + Stay Hostel',
      value: HostelType.Both,
      image: '/images/hostelTypes/both.jpg',
    },
  ];

  // For Address Details
  const [clickedLatLng, setClickedLatLng] = useState<{
    lat: number | null;
    lng: number | null;
  } | null>({ lat: null, lng: null });

  const handleClickLatLng = (lat: number | null, lng: number | null) => {
    setClickedLatLng({ lat, lng });
  };
  const [reverseGeoData, setReverseGeoData] = useState<ReverseGeoDataType>();

  const countryOptions = useMemo(() => {
    return countries.map(country => ({
      label: country.name,
      value: country.name,
    }));
  }, []);

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


  const {user}=useUserStore()



  return (
    <div className=" h-[100vh] w-[100vw]">
      <dialog id="my_modal_4" className="modal relative h-full w-full">
        <form
          className="modal-box flex h-[75%] w-11/12 max-w-7xl flex-col"
          onSubmit={handleSubmitForm(handleSubmit)}>
          <div className="hide-scrollbar flex-grow overflow-y-auto">
            {steps === 0 && (
              <div>
                <div className="my-8 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold text-gray-500 md:text-3xl">
                    What&apos;s your hostel type?
                  </h3>
                </div>
                <div className="mx-auto grid w-[100%] grid-cols-2 gap-5 md:grid-cols-4 md:gap-10">
                  {hostelTypeData.map(item => (
                    <div
                      key={item.label}
                      className={`card relative cursor-pointer border-[1px] border-gray-300 ${hostelType === item.value ? 'border-[2px] border-primary' : 'hover:border-gray-400'}`}
                      onClick={() => handleHostelType(item.value)}>
                      <div className="relative h-[100px] md:h-[200px]">
                        <Image
                          src={item.image}
                          fill
                          alt="college students"
                          className="rounded-t-2xl object-cover p-[2px]"
                        />
                      </div>
                      <div className="mb-2 flex items-center justify-center pt-6">
                        <h4 className="px-2 text-center text-lg font-bold md:px-0 md:text-2xl ">
                          {item.label}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {steps === 1 && (
              <div>
                <div className="grid w-full gap-[1rem]">
                  <div className="my-8 flex flex-col items-center justify-center">
                    <h3 className="text-3xl font-bold text-gray-500">Hostel Details</h3>
                  </div>
                  <div className="grid w-full gap-[1rem] md:grid-cols-2">
                    <div>
                      <TextInput
                        name="name"
                        type="text"
                        placeholder="Hostel Name"
                        control={control}
                        label="Hostel Name"
                        required
                        helpertext={errors.name?.type === 'required' ? 'Name Is Required' : ''}
                        error={!!errors.name}
                      />
                    </div>
                    <div>
                      <ReactSelect
                        name="genderType"
                        placeholder="Gender Type"
                        options={genderOptions}
                        control={control}
                        label="Gender Type"
                        required
                        helperText={
                          errors.genderType?.type === 'required' ? 'Gendertype Is Required' : ''
                        }
                        error={!!errors.genderType}
                      />
                    </div>
                  </div>
                  <div className="">
                    {/* <label htmlFor="description" className="mb-2 block">
                        Description
                      </label>
                      <RichTextEditor editorRef={descriptionRef} /> */}
                    <div>
                      <div className=" grid w-full gap-[1rem] md:grid-cols-2">
                        <div>
                          <TextInput
                            name="contact.email"
                            type="email"
                            placeholder="Hostel Email"
                            control={control}
                            label="Hostel Email"
                            // onKeyDown={()=>setSomeInputFieldChanged(true)}
                            required
                            helpertext={
                              errors.contact?.email?.type === 'required' ? 'Email Is Required' : ''
                            }
                            error={!!errors.contact?.email} 
                            defaultValue={user?.userEmail}
                          />
                        </div>

                        <div>
                          <TextInput
                            name="contact.phone"
                            placeholder="Phone no"
                            type="tel"
                            control={control}
                            label="Phone Number"
                            // onChange={(e)=>handlePhoneNumChange(e.target.value)}
                            required
                            helpertext={
                              errors.contact?.phone?.type === 'required' ? 'Phone Is Required' : ''
                            }
                            error={!!errors.contact?.phone}
                          />
                        </div>

                        <div>
                          <TextInput
                            name="contact.altPhone"
                            type="tel"
                            placeholder="Alternative Phone"
                            // onChange={(e)=>handleAltPhoneNumChange(e.target.value)}
                            control={control}
                            label="Alternative Phone"
                            error={!!errors.contact?.altPhone}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
         

            <div>
              {steps === 2 && (
                <MapProvider>
                  <div className=" h-auto w-full">
                    <div className="relative mt-5 h-[300px] w-full overflow-hidden md:h-[480px]">
                      <MapProvider>
                        <MapComponent
                          clickedLatLng={clickedLatLng}
                          setClickedLatLng={handleClickLatLng}
                          lat={clickedLatLng?.lat}
                          lng={clickedLatLng?.lng}
                        />
                      </MapProvider>
                    </div>
                   
                  </div>
                </MapProvider>
              )}
            </div>
            <div>
              {steps === 3 && (
                <div>
                  <div className="my-8 flex flex-col items-center justify-center">
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
                            errors.address?.country?.type === 'required'
                              ? 'Country Is Required'
                              : ''
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
                          helpertext={
                            errors.address?.city?.type === 'required' ? 'City Is Required' : ''
                          }
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
              )}
            </div>
            <div>
              {steps === 4 && (
                <div>
                  {/* <h3 className="text-3xl font-bold text-gray-500">Hostel Amenities</h3> */}
                  <HostelAmenitiesPage hostelId={0} isOnboarding={true} handleAmenityChange={setSelectedAmenities} onboardingAmenities={selectedAmenities}/>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 flex justify-end gap-[1rem]">
            <div className="mt-2 flex items-end justify-end gap-[1rem]">
              {hostelTypeErrorMessage && (
                <p className="text-base text-red">{hostelTypeErrorMessage}</p>
              )}
              {steps > 0 && (
                <Button
                  label="Back"
                  variant="outlined"
                  disabled={steps === 0}
                  className="w-min text-gray-700 disabled:cursor-not-allowed"
                  onClick={minusStep}
                  type="button"
                />
              )}
              {steps === 4 && (
                <div className="modal-action">
                  <Button label="Create My Hostel" disabled={!isValid} type="submit" loading={isLoading} />
                </div>
              )}
              {steps < 4 && (
                <Button
                  className="w-min"
                  label="Next"
                  variant="primary"
                  onClick={plusStep}
                  type="button"
                />
              )}
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

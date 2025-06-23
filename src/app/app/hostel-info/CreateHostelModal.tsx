
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Button from 'src/components/Button';
import RichTextEditor from 'src/components/RichTextEditor';

import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextArea from 'src/features/react-hook-form/TextArea';
import TextInput from 'src/features/react-hook-form/TextField';
import {
  CreateHostel,
  CreateHostelMutation,
  CreateHostelMutationVariables,
  HostelGenderType,
  HostelType,
  GetHostelByToken,
  GetHostelByTokenQuery,
  GetHostelByTokenQueryVariables,
  AddressData,
  CreateAddress,
  CreateAddressMutation,
  CreateAddressMutationVariables,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { ContactDetails } from './ContactDetails';
import { AddressDetails } from './AddressDetails';
import { countries } from '../data/countries';
import { useMemo } from 'react';
interface IProps {
  name?: string | null;

  genderType?: HostelGenderType;

  capacity?: number | null;
  description?: string | null;
}

export const CreateHostelModal = () => {
  const { setMessage, setRole, setShowToast } = useToastStore();
  const {
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IProps>({
    defaultValues: {
      genderType: HostelGenderType.Boys,
    },
  });

  watch('genderType');
  watch('name');
  const descriptionRef = useRef('');

  useEffect(() => {
    // Trigger the modal to open when the component mounts
    // @ts-ignore
    document.getElementById('my_modal_4')?.showModal();
  }, []); // This useEffect will run only once on component mount

  const [ hostelType, setHostelType ] = useState<HostelType>(HostelType.Stay);
  const [ hostelTypeErrorMessage, setHostelTypeErrorMessage ] = useState('');

  const handleHostelType = (hType: HostelType) => {
    setHostelTypeErrorMessage('');
    switch (hType) {
      case HostelType.Travel:
        setHostelType(HostelType.Travel);
        break;
      case HostelType.Stay:
        setHostelType(HostelType.Stay);
        break;
      case HostelType.Both:
        setHostelType(HostelType.Both);
        break;
      case HostelType.Pg:
        setHostelType(HostelType.Pg);
        break;
      default:
        setHostelType(HostelType.Stay);
        break;
    }
  };
  const [ steps, setSteps ] = useState(0);
  const minusStep = () => {
    if (steps > 0) setSteps(steps - 1);
  };

  const plusStep = () => {
    if (steps == 0 && hostelType === undefined) {
      setHostelTypeErrorMessage('Please select a hostel type');
      return;
    }
    if (steps < 2) setSteps(steps + 1);
  };

  const genderOptions = [
    { label: 'Boys', value: HostelGenderType.Boys },
    { label: 'Girls', value: HostelGenderType.Girls },
    { label: 'Both', value: HostelGenderType.Both },
  ];

  const mutateCreateHostelInfo = useGraphqlClientRequest<
    CreateHostelMutation,
    CreateHostelMutationVariables
  >(CreateHostel.loc?.source.body!);

  const { mutateAsync: createHostel } = useMutation({ mutationFn: mutateCreateHostelInfo });


  const router = useRouter();
  const handleSubmit = () => {
    const name = getValues('name');
    const genderType = getValues('genderType');
    const description = getValues('description');
    console.log("name,genderType,description,hostelType", name, genderType, description, hostelType);

    plusStep();
    createHostel({
      input: {
        name: name ?? '',
        genderType: genderType ?? HostelGenderType.Both,
        hostelType: hostelType ?? HostelType.Stay,

        description: descriptionRef.current ?? '',
      },
    }).then(res => {
      if (res?.createHostel?.data?.id) {
        enqueueSnackbar('Hostel created successfully.', { variant: 'success' });
        plusStep();
        //
      } else {
        plusStep();
        console.log('something went wrong', res);
        enqueueSnackbar('Something went wrong.', { variant: 'error' });
      }
    });
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
    }
  ]

  //for address details


  return (
    <div>
      <dialog
        id="my_modal_4"
        className="modal overflow-auto"
      >
        <div
          className="modal-box w-11/12 max-w-7xl"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {steps == 0 && (
            <div>
              <div className='flex flex-col items-center justify-center my-8'>
                <h3 className='text-xl md:text-3xl text-gray-500 font-bold'>What is your hostel type?</h3>
              </div>
              <div className="grid gap-5 grid-cols-2 md:grid-cols-4 md:gap-10 w-[100%] mx-auto">
                {
                  hostelTypeData.map((item) => (
                    <div
                      key={item.label}
                      className={` card relative cursor-pointer border-[1px]  border-gray-300 ${hostelType == item.value ? 'border-[2px] border-primary' : 'hover:border-gray-400'}`}
                      onClick={() => handleHostelType(item.value)}
                    >
                      <div className=" relative h-[100px] md:h-[200px]">
                        <Image src={item.image} fill alt="college students" className='object-cover rounded-t-2xl p-[2px]' />
                      </div>
                      <div className="pt-6 mb-2 flex items-center justify-center">
                        <h4 className=" text-lg text-center px-2 md:px-0 md:text-2xl font-bold ">{item.label}</h4>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
          {steps == 1 && (
            <div>
              <div className=" grid w-full gap-[1rem]">
                <div className='flex flex-col items-center justify-center my-8'>
                  <h3 className='text-3xl text-gray-500 font-bold'>Hostel Details</h3>
                </div>
                <div className=" grid w-full  gap-[1rem] md:grid-cols-2">
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
                <div>
                  <div>
                    <label htmlFor="description" className="mb-2 block">
                      Description
                    </label>
                    <RichTextEditor editorRef={descriptionRef} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {
            steps == 2 && (
              <CreateAddressForm />
            )
          }
          <div className=" flex  justify-end gap-[1rem] mt-8">
            <div className=" mt-5 flex  items-end justify-end gap-[1rem]">
              {hostelTypeErrorMessage && <p className='text-red text-base'>{hostelTypeErrorMessage}</p>}
              {
                (steps == 0 || steps == 1) && (
                  <Button
                    label="Back"
                    variant="outlined"
                    disabled={steps === 0}
                    className=" w-min text-gray-700 disabled:cursor-not-allowed"
                    onClick={() => minusStep()}
                  />
                )
              }
              {steps == 1 && (
                <div className="modal-action">
                  <form method="dialog" className="flex gap-5 ">
                    <Button
                      label="Create My Hostel"
                      disabled={!isValid}
                      onClick={() => handleSubmit()}
                    />
                  </form>
                </div>
              )}
              {steps == 0 && (
                <Button
                  className=" w-min"
                  label="Next"
                  variant="primary"
                  onClick={() => plusStep()}
                />
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const CreateAddressForm = () => {
  const countryOptions = useMemo(() => {
    return countries.map(country => ({
      label: country.name,
      value: country.name,
    }));
  }, []); 

  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressData>({
    defaultValues: {
      country: 'Nepal',
      city: '',
      subCity: '',
      street: '',
    },
  });

  const queryHostelData = useGraphqlClientRequest<
    GetHostelByTokenQuery,
    GetHostelByTokenQueryVariables
  >(GetHostelByToken.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHostelData();
    return res.getHostelByToken;
  };

  const { data: hostelData, isLoading } = useQuery({
    queryKey: [ 'getHostelByToken' ],
    queryFn: fetchData,
  });

  const hostelId = Number(hostelData?.data?.id);
  console.log("hostelId", hostelId);

  const mutateCreateHostelAddress = useGraphqlClientRequest<
    CreateAddressMutation,
    CreateAddressMutationVariables
  >(CreateAddress.loc?.source.body!);

  const { mutateAsync: createAddress, isPending: isCreating } = useMutation({
    mutationFn: mutateCreateHostelAddress,
  });

  const handleAddressSubmit = (data: AddressData) => {
    const { country, city, subCity, street } = data;
    createAddress({
      input: {
        hostelId: hostelId,
        country: country ?? '',
        city: city,
        subCity,
        street,
      },
    }).then(res => {
      if (res?.createAddress?.data?.id) {
        enqueueSnackbar('Address Created', { variant: 'success' });
        queryClient.invalidateQueries({ queryKey: [ 'getAddress' ] });
        queryClient.invalidateQueries({ queryKey: [ 'getHostelByToken' ] });
        router.push('/app/hostel-info');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    });
  }
  return (
    <>
      <div className='flex flex-col items-center justify-center my-8'>
        <h3 className='text-3xl text-gray-500 font-bold'>Address Details</h3>
      </div>
      <form onSubmit={handleSubmit(handleAddressSubmit)}>
        <div className=" grid h-auto w-full gap-5 md:grid-cols-2 mt-5">
          <div>
            <ReactSelect
              name="country"
              placeholder="Country"
              control={control}
              options={countryOptions}
              label="Country"
              required
              helperText={errors.country?.type === 'required' ? 'Country Is Required' : ''}
              error={!!errors.country}
            />
          </div>

          <div>
            <TextInput
              name="city"
              type="text"
              placeholder="City"
              control={control}
              label="City"
              required
              helpertext={errors.city?.type === 'required' ? 'City Is Required' : ''}
              error={!!errors.city}
            />
          </div>
          <div>
            <TextInput
              name="subCity"
              type="text"
              placeholder="Tole"
              control={control}
              label="Tole"
              error={!!errors.subCity}
            />
          </div>
          <div>
            <TextInput
              name="street"
              type="text"
              placeholder="Street"
              control={control}
              label="Street"
              error={!!errors.street}
            />
          </div>
        </div>
        <div className=" mt-5 flex w-full  items-end justify-end gap-[1rem]">
          <Button
            type="submit"
            label="Complete Process"
            variant="primary"
            className=" w-min text-gray-700 disabled:cursor-not-allowed"
          />
        </div>
      </form>
    </>
  );
}
'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Button from 'src/components/Button';
import RichTextEditor from 'src/components/RichTextEditor';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextInput from 'src/features/react-hook-form/TextField';
import {
  CreateHostel,
  CreateHostelMutation,
  CreateHostelMutationVariables,
  HostelGenderType,
  HostelType,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { AddressDetails } from './AddressDetails';
import { MapProvider } from 'src/features/MapProvider';
import { ContactDetails } from './ContactDetails';
interface IProps {
  name?: string | null;
  genderType?: HostelGenderType;
  capacity?: number | null;
  description?: string | null;
}

export const CreateHostelModal = () => {
  const [hostelId, setHostelId] = useState<number | null>(null);
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
    // Open modal on mount
    // @ts-ignore
    document.getElementById('my_modal_4')?.showModal();
  }, []);

  const [hostelType, setHostelType] = useState<HostelType>(HostelType.Stay);
  const [hostelTypeErrorMessage, setHostelTypeErrorMessage] = useState('');
  const [steps, setSteps] = useState(0);

  const handleHostelType = (hType: HostelType) => {
    setHostelTypeErrorMessage('');
    setHostelType(hType);
  };

  const minusStep = () => {
    if (steps > 0) setSteps(steps - 1);
  };

  const plusStep = () => {
 
    if (steps < 3) {
      setSteps(steps + 1); 
    } else {
      enqueueSnackbar('Onboarding completed.', { variant: 'success' });
      window.location.reload();
    }
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

  const handleSubmit = async () => {
    const name = getValues('name');
    const genderType = getValues('genderType');
    const description = descriptionRef.current;
    plusStep();
    try {
      const res = await createHostel({
        input: {
          name: name ?? '',
          genderType: genderType ?? HostelGenderType.Both,
          hostelType: hostelType ?? HostelType.Stay,
          description: description ?? '',
        },
      });
      if (res?.createHostel?.data?.id) {
        enqueueSnackbar('Hostel created successfully.', { variant: 'success' });
        setHostelId(Number(res?.createHostel?.data?.id));
        plusStep();
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

  return (
    <div className=" h-[100vh] w-[100vw]">
      <dialog id="my_modal_4" className="modal h-full w-full ">
        <div className="modal-box h-[70%] w-11/12 max-w-7xl flex flex-col">
          <div className="flex-grow overflow-y-auto">

            {steps === 0 && (
              <div>
                <div className="my-8 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold text-gray-500 md:text-3xl">
                    What is your hostel type?
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
                  <div>
                    <label htmlFor="description" className="mb-2 block">
                      Description
                    </label>
                    <RichTextEditor editorRef={descriptionRef} />
                  </div>
                </div>
              </div>
            )}
            <div>{steps === 2 && <CreateAddressForm hostelId={hostelId} handleNextStep={plusStep} />}</div>
            <div>{steps === 3 && <CreateContactForm hostelId={hostelId} handleNextStep={plusStep} />}</div>

            </div>



            <div className="mt-3 flex justify-end gap-[1rem]">
              <div className="mt-2 flex items-end justify-end gap-[1rem]">
                {hostelTypeErrorMessage && (
                  <p className="text-base text-red">{hostelTypeErrorMessage}</p>
                )}
                {(steps === 0 || steps === 1) && (
                  <Button
                    label="Back"
                    variant="outlined"
                    disabled={steps === 0}
                    className="w-min text-gray-700 disabled:cursor-not-allowed"
                    onClick={minusStep}
                  />
                )}
                {steps === 1 && (
                  <div className="modal-action">
                    <form method="dialog" className="flex gap-5 ">
                      <Button label="Create My Hostel" disabled={!isValid} onClick={handleSubmit} />
                    </form>
                  </div>
                )}
                {steps === 0 && (
                  <Button className="w-min" label="Next" variant="primary" onClick={plusStep} />
                )}
              </div>
            </div>
         
        </div>
      </dialog>
    </div>
  );
};

const CreateAddressForm = ({ hostelId, handleNextStep }: { hostelId: number | null, handleNextStep: () => void }) => {
  if (!hostelId) return null;
  return (
    <>
      <div className="my-8 flex flex-col items-center justify-center">
        <h3 className="text-3xl font-bold text-gray-500">Address Details</h3>
      </div>
      <MapProvider> 
        <AddressDetails hostelId={hostelId} handleNextStep={handleNextStep} />
      </MapProvider>
    </>
  );
};


const CreateContactForm = ({ hostelId, handleNextStep }: { hostelId: number | null, handleNextStep: () => void }) => {
  if (!hostelId) return null;
  return (
    <>
      <div className="my-8 flex flex-col items-center justify-center">
        <h3 className="text-3xl font-bold text-gray-500">Contact Details</h3>
      </div>
      <MapProvider> 
        <ContactDetails hostelId={hostelId} handleNextStep={handleNextStep} />
      </MapProvider>
    </>
  );
};
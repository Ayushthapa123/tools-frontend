//@ts-nocheck
'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';
import RichTextEditor from 'src/components/RichTextEditor';

import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextArea from 'src/features/react-hook-form/TextArea';
import TextInput from 'src/features/react-hook-form/TextField';
import { CreateHostel, CreateHostelMutation, CreateHostelMutationVariables, HostelGenderType, HostelType } from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';

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
    defaultValues: {},
  });

  watch('genderType');
  watch('name');
  const descriptionRef = useRef('');


  useEffect(() => {
    // Trigger the modal to open when the component mounts
    document.getElementById('my_modal_4')?.showModal();
  }, []); // This useEffect will run only once on component mount

  const [hostelType, setHostelType] = useState<'STAY' | 'TRAVEL' | 'BOTH' | "PG">('STAY');
  
  const handleHostelType = (hType: 'TRAVEL' | 'STAY') => {
  if (hType == 'TRAVEL') {
      setHostelType('TRAVEL');
    } else {
      setHostelType('STAY');
    }
  };
  const [steps, setSteps] = useState(0);
  const minusStep = () => {
    if (steps > 0) setSteps(steps - 1);
  };

  const plusStep = () => {
    if (steps < 1) setSteps(steps + 1);
  };

  const genderOptions = [
    { label: 'Boys', value: 'BOYS' },
    { label: 'Girls', value: 'GIRLS' },
    { label: 'Both', value: 'BOTH' },
  ];

  const mutateCreateHostelInfo = useGraphqlClientRequest<
    CreateHostelMutation,
    CreateHostelMutationVariables
  >(CreateHostel.loc?.source.body!);

  const { mutateAsync: createHostel } = useMutation({ mutationFn: mutateCreateHostelInfo });

  const handleSubmit = () => {
    const name = getValues('name');
    const genderType = getValues('genderType');
    const description = getValues('description');

    createHostel({
      input: {
        name: name ?? '',
        genderType: genderType ?? HostelGenderType.Both,
        hostelType: hostelType ?? HostelType.Stay,

        description: descriptionRef.current ?? '',
      },
    }).then(res => {
      if (res?.createHostel?.data?.id) {
        enqueueSnackbar("Homestay created successfully.",{variant:"success"})
        window.location.reload();
        //
        window.location.reload();
      } else {
        enqueueSnackbar("Something went wrong.",{variant:'error'})

      }
    });
  };

  const isValid = Boolean(getValues('name') && getValues('genderType'));

  return (
    <div>
      <dialog id="my_modal_4" className="modal ">
        <div className="w-11/12 max-w-5xl modal-box">
          {steps == 0 && (
            <div>
              <h3 className="">How Do You Categorize Your Hostel?</h3>
              <div className="grid md:grid-cols-2 md:gap-10  gap-5">
                <div
                  className={`card relative  ${hostelType == 'STAY' ? 'border-[5px] border-primary' : ''} cursor-pointer p-5 shadow-md`}
                  onClick={() => handleHostelType('STAY')}>
                  <div className=" relative md:h-[300px] h-[210px] w-full">
                    <Image src={'/images/students.jpg'} fill alt="college students" />
                  </div>
                  <div className="mt-5 ">
                    <h4 className="text-lg font-semibold ">Stay Hostel</h4>
                    <p className="text-gray-500 ">For Young Professionals and College Students</p>
                  </div>
                </div>
                <div
                  className={` card relative cursor-pointer p-5 shadow-md ${hostelType == 'TRAVEL' ? 'border-[5px] border-primary' : ''}`}
                  onClick={() => handleHostelType('TRAVEL')}>
                  <div className=" relative md:h-[300px] h-[210px] w-full">
                    <Image src={'/images/travellers.jpg'} fill alt="college students" />
                  </div>
                  <div className="mt-5 ">
                    <h4 className="text-lg font-semibold ">Travel Hostel</h4>
                    <p className="text-gray-500 ">For Travellers and Backpackers</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {steps == 1 && (
            <div>
              <div className=" grid w-full gap-[1rem]">
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
                  <label htmlFor="description" className="block mb-2">Description</label>
                  <RichTextEditor editorRef={descriptionRef} />
                </div>
                </div>
              </div>
            </div>
          )}
          <div className=' flex  justify-end gap-[1rem]'>
            <div className=" mt-5 flex  items-end justify-end gap-[1rem]">
              <Button
                label="Back"
                variant="secondary"
                className=" w-min"
                onClick={() => minusStep()}
              />
              {steps < 1 && (
                <Button
                  className=" w-min"
                  label="Next"
                  variant="primary"
                  onClick={() => plusStep()}
                />
              )}
            </div>
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
          </div>
        </div>
      </dialog>
    </div>
  );
};

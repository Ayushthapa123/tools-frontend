'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';
import RichTextEditor from 'src/components/RichTextEditor';

import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextArea from 'src/features/react-hook-form/TextArea';
import TextInput from 'src/features/react-hook-form/TextField';
import { CreateHomestay, CreateHomestayMutation, CreateHomestayMutationVariables } from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';

interface IProps {
  name?: string | null;

}

export const CreateHomestayModal = () => {
  const { setMessage, setRole, setShowToast } = useToastStore();
  const {
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IProps>({
    defaultValues: {},
  });

  watch('name'); 
  const descriptionRef = useRef('');

  useEffect(() => {
    // Trigger the modal to open when the component mounts
    // @ts-ignore
    document.getElementById('my_modal_4')?.showModal();
  }, []); // This useEffect will run only once on component mount

  const [homestayType, setHomestayType] = useState<'STAY' | 'TRAVEL' | 'BOTH'>('STAY');
  
  const handleHomestayType = (hType: 'TRAVEL' | 'STAY') => {
  if (hType == 'TRAVEL') {
        setHomestayType('TRAVEL');
    } else {
      setHomestayType('STAY');
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

  const mutateCreateHomestayInfo = useGraphqlClientRequest<
    CreateHomestayMutation,
    CreateHomestayMutationVariables
  >(CreateHomestay.loc?.source.body!);

  const { mutateAsync: createHomestay } = useMutation({ mutationFn: mutateCreateHomestayInfo });

  const handleSubmit = () => {
    const name = getValues('name');
    const description = descriptionRef.current;

    createHomestay({
      input: {
        name: name ?? '',
        description: description ?? '',
    
      },
    }).then(res => {
      if (res?.createHomestay?.data?.id) {
        setShowToast(true);
        setMessage('homestay created');
        setRole('success');
        //
        window.location.reload();
      } else {
        setShowToast(true);
        setMessage('Something Went Wrong!');
        setRole('error');
      }
    });
  };


  return (
    <div>
      <dialog id="my_modal_4" className="modal ">
        <div className="w-11/12 max-w-5xl modal-box">
          {steps == 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-center">Welcome to Homestay Creation!</h3>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  Thank you for choosing to list your homestay with us. Before you proceed, please read through the following information:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Ensure your homestay meets our quality standards and guidelines</li>
                  <li>Have clear photos of your property ready to upload</li>
                  <li>Prepare accurate details about your homestay facilities and amenities</li>
                  <li>Review our hosting requirements and responsibilities</li>
                </ul>
                <div className="mt-4">
                  <p className="text-gray-600">
                    By creating a homestay listing, you agree to our{' '}
                    <a href="/terms" className="text-primary hover:underline">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="/hosting-guidelines" className="text-primary hover:underline">
                      Hosting Guidelines
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}
          {steps == 1 && (
            <div>
              <div className=" grid w-full gap-[1rem]">
                <div className=" grid w-full  gap-[1rem]">
                  <div>
                    <TextInput
                      name="name"
                      type="text"
                      placeholder="Homestay Name"
                      control={control}
                      label="Homestay Name"
                      required
                      helpertext={errors.name?.type === 'required' ? 'Name Is Required' : ''}
                      error={!!errors.name}
                      customType='name'
                    />
                  </div>

          
                </div>
                <div>
                  <label htmlFor="description" className="block mb-2">Description</label>
                  <RichTextEditor editorRef={descriptionRef} />
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
                    label="Create My Homestay"
                    disabled={!getValues('name')}
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

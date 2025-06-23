'use client';
import React, { FC, useEffect, useState } from 'react';

import Button from 'src/components/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import TextInput from 'src/features/react-hook-form/TextField';

import {
  CreateContacts,
  CreateContactsMutation,
  CreateContactsMutationVariables,
  GetContactsByHostelId,
  GetContactsByHostelIdQuery,
  GetContactsByHostelIdQueryVariables,
  UpdateContact,
  UpdateContactMutation,
  UpdateContactMutationVariables,
} from 'src/gql/graphql';
import LoadingSpinner from 'src/components/Loading';
import { enqueueSnackbar } from 'notistack';

interface Iprops {
  hostelId: number;
  handleNextStep?: () => void;
}
export const ContactDetails = (props: Iprops) => {
  const { hostelId, handleNextStep } = props;
  const queryContactData = useGraphqlClientRequest<
    GetContactsByHostelIdQuery,
    GetContactsByHostelIdQueryVariables
  >(GetContactsByHostelId.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryContactData({ hostelId: hostelId });
    return res.getContactByHostelId;
  };

  const { data: hostelData, isLoading } = useQuery({
    queryKey: ['getContacts'],
    queryFn: fetchData,
  });

  return (
    <div className="    w-full">
      {!isLoading ? (
        <HostelInfoForm
          hostelId={hostelId}
          contactId={hostelData?.data?.id}
          phone={hostelData?.data?.phone}
          altPhone={hostelData?.data?.altPhone}
          email={hostelData?.data?.email}
          handleNextStep={handleNextStep}
        />
      ) : (
        <div className=" relative h-[50vh] w-full">
          <LoadingSpinner color="primary" size="lg" />
        </div>
      )}
    </div>
  );
};

interface IProps {
  hostelId: number;
  contactId?: string | null;

  email?: string | null;

  phone?: string | null;
  altPhone?: string | null;
  handleNextStep?: () => void;
}

const HostelInfoForm: FC<IProps> = props => {
  const { altPhone, contactId, email, phone, hostelId, handleNextStep } = props;

  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IProps>({
    defaultValues: {
      altPhone,
      phone,
      email,
    },
  });
  const changingEmail = watch('email');

  const mutateCreateHostelContact = useGraphqlClientRequest<
    CreateContactsMutation,
    CreateContactsMutationVariables
  >(CreateContacts.loc?.source.body!);

  const { mutateAsync: createContact, isPending: isCreating } = useMutation({
    mutationFn: mutateCreateHostelContact,
  });

  const mutateUpdateContact = useGraphqlClientRequest<
    UpdateContactMutation,
    UpdateContactMutationVariables
  >(UpdateContact.loc?.source.body!);

  const { mutateAsync: updateContact, isPending: isUpdating } = useMutation({
    mutationFn: mutateUpdateContact,
  });

  const handleSubmitForm = (data: IProps) => {
    const phone = data.phone;
    const altPhone = data.altPhone;
    const email = data.email;

    if (contactId) {
      //
      updateContact({
        contactId: Number(contactId),
        input: {
          ...(phone && {
            phone,
          }),
          ...(altPhone && {
            altPhone,
          }),
          ...(email && {
            email: email.trim(),
          }),
        },
      }).then(res => {
        if (res?.updateContact?.data?.id) {
          enqueueSnackbar('Contact updated', { variant: 'success' });
        } else {
          enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
      });
    } else {
      createContact({
        input: {
          hostelId: hostelId,
          email: email?.trim() ?? '',
          phone: phone ?? '',
          altPhone,
        },
      }).then(res => {
        if (res?.createContact?.data?.id) {
          enqueueSnackbar('Contacts created', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getContacts'] });
          queryClient.invalidateQueries({ queryKey: ['getHostelByToken'] });
          handleNextStep?.();
        } else {
          enqueueSnackbar('something went wrong.', { variant: 'error' });
        }
      });
    }
  };

  return (
    <form className=" w-full" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className=" grid w-full gap-[1rem] md:grid-cols-2">
        <div>
          <TextInput
            name="email"
            type="email"
            placeholder="Hostel Email"
            control={control}
            label="Hostel Email"
            // onKeyDown={()=>setSomeInputFieldChanged(true)}
            required
            helpertext={errors.email?.type === 'required' ? 'Email Is Required' : ''}
            error={!!errors.email}
          />
        </div>

        <div>
          <TextInput
            name="phone"
            placeholder="Phone no"
            type="tel"
            control={control}
            label="Phone Number"
            // onChange={(e)=>handlePhoneNumChange(e.target.value)}
            required
            helpertext={errors.phone?.type === 'required' ? 'Phone Is Required' : ''}
            error={!!errors.phone}
          />
        </div>

        <div>
          <TextInput
            name="altPhone"
            type="tel"
            placeholder="Alternative Phone"
            // onChange={(e)=>handleAltPhoneNumChange(e.target.value)}
            control={control}
            label="Alternative Phone"
            error={!!errors.altPhone}
          />
        </div>
      </div>

      <div className="mt-4">
        {/* <span className='text-error text-sm'><p className='inline-block'>{(phoneNumber || altPhoneNumber ) && getErrorMessage(phoneNumber,altPhoneNumber,changingEmail)}</p></span> */}
      </div>

      <div className=" flex w-full justify-end">
        <div className=" mt-10 w-[200px]">
          <Button
            label={`${contactId ? 'Update Contact Info' : 'Create Contact'}`}
            type="submit"
            loading={isCreating || isUpdating}
            // disabled={ getErrorMessage(phoneNumber,altPhoneNumber,changingEmail)!= true  || !someInputFieldChanged}
          />
        </div>
      </div>
    </form>
  );
};

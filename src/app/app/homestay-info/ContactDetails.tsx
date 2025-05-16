'use client';
import React, { FC, useEffect, useState } from 'react';

import Button from 'src/components/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import TextInput from 'src/features/react-hook-form/TextField';

import { useToastStore } from 'src/store/toastStore';

import {
  CreateContacts,
  CreateContactsMutation,
  CreateContactsMutationVariables,
  GetContactsByHomestayId,
  GetContactsByHomestayIdQuery,
  GetContactsByHomestayIdQueryVariables,
  UpdateContact,
  UpdateContactMutation,
  UpdateContactMutationVariables,
} from 'src/gql/graphql';
import LoadingSpinner from 'src/components/Loading';

interface Iprops {
  homestayId: number; 
}
export const ContactDetails = (props: Iprops) => {
  const { homestayId } = props;
  const queryContactData = useGraphqlClientRequest<
    GetContactsByHomestayIdQuery,
    GetContactsByHomestayIdQueryVariables
  >(GetContactsByHomestayId.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryContactData({ homestayId: homestayId });
    return res.getContactByHomestayId;
  };

  const { data: homestayData, isLoading } = useQuery({
    queryKey: ['getContacts'],
    queryFn: fetchData,
  });

  return (
    <div className="    w-full">
      {!isLoading ? (
        <HomestayInfoForm
          homestayId={homestayId}
          contactId={homestayData?.id}
          phone={homestayData?.phone}
          altPhone={homestayData?.altPhone}
          email={homestayData?.email}
        />
      ) : (
        <div className=" relative h-[50vh] w-full">
          <LoadingSpinner  color='primary' size='lg' />
        </div>
      )}
    </div>
  );
};

interface IProps {
  homestayId: number;
  contactId?: string | null;

  email?: string | null;

  phone?: string | null;
  altPhone?: string | null;
}

const HomestayInfoForm: FC<IProps> = props => {
  const { altPhone, contactId, email, phone, homestayId } = props;

  const queryClient = useQueryClient();

  const { setMessage, setRole, setShowToast } = useToastStore();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProps>({
    defaultValues: {
      altPhone,
      phone,
      email,
    },
  });

  const mutateCreateHomestayContact = useGraphqlClientRequest<
    CreateContactsMutation,
    CreateContactsMutationVariables
  >(CreateContacts.loc?.source.body!);

  const { mutateAsync: createContact, isPending: isCreating } = useMutation({
    mutationFn: mutateCreateHomestayContact,
  });

  const mutateUpdateContact = useGraphqlClientRequest<
    UpdateContactMutation,
    UpdateContactMutationVariables
  >(UpdateContact.loc?.source.body!);

  const { mutateAsync: updateContact ,isPending:isUpdating} = useMutation({ mutationFn: mutateUpdateContact });

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
            email,
          }),
        },
      }).then(res => {
        if (res?.updateContact?.id) {
          setShowToast(true);
          setMessage('Contact Updated');
          setRole('success');
        } else {
          setShowToast(true);
          setMessage('Something went wrong!');
          setRole('error');
        }
      });
    } else {
      createContact({
        input: {
          homestayId: homestayId,
          email: email ?? '',
          phone: phone ?? '',
          altPhone,
        },
      }).then(res => {
        if (res?.createContact?.id) {
          setShowToast(true);
          setMessage('Contact created');
          setRole('success');
          //
          queryClient.invalidateQueries({ queryKey: ['getContacts'] });
          queryClient.invalidateQueries({ queryKey: ['getHomestayByToken'] });
        } else {
          setShowToast(true);
          setMessage('Something Went Wrong!');
          setRole('error');
        }
      });
    }
  };
  const [ phoneNumber, setPhoneNumber ] = useState<string | null>(null);
  const [ altPhoneNumber, setAltPhoneNumber ] = useState<string | null>(null);
  useEffect(() => {
    setPhoneNumber(phone??null);
    setAltPhoneNumber(altPhone??null) 
  },[])
  
  const handlePhoneNumChange = (phone: string) => {
    setPhoneNumber(phone);
    setValue("phone",phone)
  }

  const handleAltPhoneNumChange = (phone: string) => {
    setAltPhoneNumber(phone);
    setValue("altPhone",phone)
  }
  
  const getErrorMessage = (phone: string|null, altPhone: string|null) => {
    if (!phone) {
      return "Enter phone number"
    }
    else if (phone?.length != 10) {
      return "Invalid phone number";
    } else if (altPhone && altPhone?.length != 10) {
      return "Invalid alt phone number";
    }
    return true;
  }

  return (
    <form className=" w-full" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className=" grid w-full gap-[1rem] md:grid-cols-2">
        <div>
          <TextInput
            name="email"
            type="email"
            placeholder="Homestay Email"
            control={control}
            label="Homestay Email"
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
            onChange={(e)=>handlePhoneNumChange(e.target.value)}
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
            onChange={(e)=>handleAltPhoneNumChange(e.target.value)}
            control={control}
            label="Alternative Phone"
            error={!!errors.altPhone}
          />
        </div>
      </div>

      <div className='mt-4'>
        <span className='text-error text-sm'><p className='inline-block'>{(phoneNumber || altPhoneNumber ) && getErrorMessage(phoneNumber,altPhoneNumber)}</p></span>
      </div>

      <div className=" flex w-full justify-end">
        <div className=" mt-10 w-[200px]">
          <Button label={`${contactId ? 'Update Contact Info' : 'Create Contact'}`} type="submit" loading={isCreating || isUpdating} disabled={ getErrorMessage(phoneNumber,altPhoneNumber)!= true } />
        </div>
      </div>
    </form>
  );
};

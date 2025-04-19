'use client';
import React, { FC } from 'react';

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
  hostelId: number;
}
export const ContactDetails = (props: Iprops) => {
  const { hostelId } = props;
  const queryContactData = useGraphqlClientRequest<
    GetContactsByHomestayIdQuery,
    GetContactsByHomestayIdQueryVariables
  >(GetContactsByHomestayId.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryContactData({ homestayId: hostelId });
    return res.getContactByHomestayId;
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
          contactId={hostelData?.id}
          phone={hostelData?.phone}
          altPhone={hostelData?.altPhone}
          email={hostelData?.email}
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
  hostelId: number;
  contactId?: string | null;

  email?: string | null;

  phone?: string | null;
  altPhone?: string | null;
}

const HostelInfoForm: FC<IProps> = props => {
  const { altPhone, contactId, email, phone, hostelId } = props;

  const queryClient = useQueryClient();

  const { setMessage, setRole, setShowToast } = useToastStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProps>({
    defaultValues: {
      altPhone,
      phone,
      email,
    },
  });

  const mutateCreateHostelContact = useGraphqlClientRequest<
    CreateContactsMutation,
    CreateContactsMutationVariables
  >(CreateContacts.loc?.source.body!);

  const { mutateAsync: createContact,isPending:isCreating } = useMutation({ mutationFn: mutateCreateHostelContact });

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
          homestayId: hostelId,
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
          queryClient.invalidateQueries({ queryKey: ['getHostelByToken'] });
        } else {
          setShowToast(true);
          setMessage('Something Went Wrong!');
          setRole('error');
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
            type="text"
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
            control={control}
            label="Phone Number"
            required
            helpertext={errors.phone?.type === 'required' ? 'Phone Is Required' : ''}
            error={!!errors.phone}
          />
        </div>

        <div>
          <TextInput
            name="altPhone"
            type="text"
            placeholder="Capacity"
            control={control}
            label="Alternative Phone"
            error={!!errors.altPhone}
          />
        </div>
      </div>

      <div className=" flex w-full justify-end">
        <div className=" mt-10 w-[200px]">
          <Button label={`${contactId ? 'Update Contact Info' : 'Create Contact'}`} type="submit"  loading={isCreating || isUpdating}/>
        </div>
      </div>
    </form>
  );
};

'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import TextInput from 'src/features/react-hook-form/TextField';

import React, { FC, useRef, useState } from 'react';
import Button from 'src/components/Button';
import { ContactDetails } from './ContactDetails';

import {
  GetHostelByToken,
  GetHostelByTokenQuery,
  GetHostelByTokenQueryVariables,
  UpdateHostel,
  UpdateHostelMutation,
  UpdateHostelInput,
  UpdateHostelMutationVariables,
} from 'src/gql/graphql';
import { AddressDetails } from './AddressDetails';
import LoadingSpinner from 'src/components/Loading';
import RichTextEditor from 'src/components/RichTextEditor';
import { MapProvider } from 'src/features/MapProvider';
import { enqueueSnackbar } from 'notistack';

export const HostelInfo = () => {
  const queryHostelData = useGraphqlClientRequest<
    GetHostelByTokenQuery,
    GetHostelByTokenQueryVariables
  >(GetHostelByToken.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHostelData();
    return res;
  };

  const { data: hostelData, isLoading } = useQuery({
    queryKey: ['getHostelByToken1'],
    queryFn: fetchData,
  });

  return (
    <div className=" w-full">
      {!isLoading ? (
        <HostelInfoForm
          hostelId={Number(hostelData?.getHostelByToken?.data?.id) || undefined}
          name={hostelData?.getHostelByToken?.data?.name}
          description={hostelData?.getHostelByToken?.data?.description}
          depositAmount={hostelData?.getHostelByToken?.data?.depositAmount}
          admissionFee={hostelData?.getHostelByToken?.data?.admissionFee}
        />
      ) : (
        <div className=" relative h-[50vh] w-full">
          <LoadingSpinner color="primary" size="lg" />
        </div>
      )}

      {hostelData?.getHostelByToken?.data?.id && (
        <div>
          {
            <div className="card card-body card-bordered bg-white">
              <HostelTabs hostelId={Number(hostelData?.getHostelByToken?.data?.id)} />
            </div>
          }
        </div>
      )}
    </div>
  );
};

const HostelTabs = ({ hostelId }: { hostelId: number }) => {
  const tabs = [
    { title: 'Contact Details', id: 1, comp: <ContactDetails hostelId={hostelId} /> },
    {
      title: 'Address Details',
      id: 2,
      comp: (
        <MapProvider>
          <AddressDetails hostelId={hostelId} />
        </MapProvider>
      ),
    },
  ];
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-full ">
      <div
        role="tablist"
        className="tabs-boxed tabs z-[99] mb-2 flex flex-wrap bg-transparent pt-2"
      >
        {/* {tabs.map(tab => (
          <a
            key={tab.id}
            role="tab"
            className={` tab  font-medium ${tab.id == activeTab ? 'tab-active text-white ' : ' text-primary'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </a>
        ))} */}
      </div>
      {tabs.map((tab, index) => (
        <div key={index}>
          {true && (
            <div>
              <h3 className=" mb-[1rem] ">{tab.title}</h3>
              {tab.comp}
              {/* <hr className=" divider" /> */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};



export const HostelInfoForm: FC<UpdateHostelInput & { hostelId: number | undefined }> = props => {
  const { name, description, hostelId, depositAmount, admissionFee } = props;
  const [hostelName, setHostelName] = useState<string | null>(null);
  const [hostelDescription, setHostelDescription] = useState<string | null>(description ?? null);

  const queryClient = useQueryClient();

  const descriptionRef = useRef(description);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateHostelInput & { hostelId: number | undefined }>({
    defaultValues: {
      name: name,
      depositAmount: depositAmount,
      admissionFee: admissionFee,
    },
  });

  const mutateUpdateHostelInfo = useGraphqlClientRequest<
    UpdateHostelMutation,
    UpdateHostelMutationVariables
  >(UpdateHostel.loc?.source.body!);

  const { mutateAsync: updateHostel, isPending } = useMutation({
    mutationFn: mutateUpdateHostelInfo,
  });
  const handleSubmitForm = (data: UpdateHostelInput ) => {
    const name = data.name ?? undefined;
    const description = descriptionRef.current ?? '';
    const depositAmount = Number(data.depositAmount) || undefined;
    const admissionFee = Number(data.admissionFee) || undefined;

    if (hostelId) {
      //
      updateHostel({
        hostelId: Number(hostelId),
        input: {
          ...(name && {
            name,
          }),
          ...(description && {
            description,
          }),
          ...(depositAmount && {
            depositAmount,
          }),
          ...(admissionFee && {
            admissionFee,
          }),
        },
      }).then(res => {
        if (res?.updateHostel?.data?.id) {
          enqueueSnackbar('Hostel updated successfully.', { variant: 'success' });
        } else {
          enqueueSnackbar('Something went wrong.', { variant: 'warning' });
        }
      });
    }
  };

  return (
    <form
      className="card card-body card-bordered mb-4 w-full gap-[1rem] bg-white"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className=" grid gap-[1rem] md:grid-cols-2">
        <div>
          <TextInput
            name="name"
            type="text"
            placeholder="Hostel Name"
            control={control}
            label="Hostel Name"
            required
            onKeyDown={e => setHostelName(e.key)}
            helpertext={errors.name?.type === 'required' ? 'Name Is Required' : ''}
            error={!!errors.name}
            customType="name"
          />
        </div>
     
      </div>
      <div className="grid gap-[1rem] md:grid-cols-2">
        <div>
          <TextInput
            name="admissionFee"
            type="number"
            customType="price"
            placeholder="Admission Fee"
            control={control}
            label="Admission Fee"
            // required
            helpertext={errors.admissionFee?.type === 'required' ? 'Admission Fee Is Required' : ''}
            error={!!errors.admissionFee}
          />
        </div>
        <div>
          <TextInput
            name="depositAmount"
            type="number"
            customType="price"
            placeholder="Deposit Amount"
            control={control}
            label="Deposit Amount"
            // required
            helpertext={errors.depositAmount?.type === 'required' ? 'Deposit Amount Is Required' : ''}
            error={!!errors.depositAmount}
          />
        </div>
        </div>
      <div>
        <RichTextEditor editorRef={descriptionRef} onChange={e => setHostelDescription(e)} />
      </div>
      <div className="flex justify-end ">
        <div className=" mt-10 w-fit md:w-[200px]">
          <Button
            label={`${hostelId ? 'Update Hostel Info' : 'Create Hostel Info'}`}
            type="submit"
            loading={isPending}
            // disabled={ }
          />
        </div>
      </div>
    </form>
  );
};

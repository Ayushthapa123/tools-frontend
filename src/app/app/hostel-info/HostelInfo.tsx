'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
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
    return res.getHostelByToken;
  };

  const { data: hostelData, isLoading } = useQuery({
    queryKey: ['getHostelByToken'],
    queryFn: fetchData,
  });

  return (
    <div className=" w-full">
      {!isLoading ? (
        <HostelInfoForm
          hostelId={hostelData?.data?.id}
          name={hostelData?.data?.name}
          description={hostelData?.data?.description}
        />
      ) : (
        <div className=" relative h-[50vh] w-full">
          <LoadingSpinner color="primary" size="lg" />
        </div>
      )}

      {hostelData?.data?.id && (
        <div>
          {
            <div className="card card-body card-bordered bg-white">
              <HostelTabs hostelId={Number(hostelData.data.id)} />
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
        {tabs.map(tab => (
          <a
            key={tab.id}
            role="tab"
            className={` tab  font-medium ${tab.id == activeTab ? 'tab-active text-white ' : ' text-primary'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </a>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div key={index}>
          {tab.id == activeTab && (
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

interface IProps {
  hostelId?: string | null;

  name?: string | null;

  description?: string | null;
}

export const HostelInfoForm: FC<IProps> = props => {
  const { name, description, hostelId } = props;
  const [hostelName, setHostelName] = useState<string | null>(null);
  const [hostelDescription, setHostelDescription] = useState<string | null>(description ?? null);

  const queryClient = useQueryClient();

  const descriptionRef = useRef(description);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProps>({
    defaultValues: {
      name: name,
    },
  });

  const mutateUpdateHostelInfo = useGraphqlClientRequest<
    UpdateHostelMutation,
    UpdateHostelMutationVariables
  >(UpdateHostel.loc?.source.body!);

  const { mutateAsync: updateHostel, isPending } = useMutation({
    mutationFn: mutateUpdateHostelInfo,
  });
  const handleSubmitForm = (data: IProps) => {
    const name = data.name ?? undefined;
    const description = descriptionRef.current ?? '';

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
      <div>
        <RichTextEditor editorRef={descriptionRef} onChange={e => setHostelDescription(e)} />
      </div>
      <div className="flex justify-end ">
        <div className=" mt-10 w-fit md:w-[200px]">
          <Button
            label={`${hostelId ? 'Update Hostel Info' : 'Create Hostel Info'}`}
            type="submit"
            loading={isPending}
            disabled={hostelName == null && hostelDescription == description}
          />
        </div>
      </div>
    </form>
  );
};

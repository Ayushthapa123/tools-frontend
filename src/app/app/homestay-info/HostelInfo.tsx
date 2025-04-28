'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import TextInput from 'src/features/react-hook-form/TextField';

import { useToastStore } from 'src/store/toastStore';

import React, { FC, useRef, useState } from 'react';
import TextArea from 'src/features/react-hook-form/TextArea';
import Button from 'src/components/Button';
import { ContactDetails } from './ContactDetails';

import {
  GetHomestayByToken,
  GetHomestayByTokenQuery,
  GetHomestayByTokenQueryVariables,
  UpdateHomestay,
  UpdateHomestayMutation,
  UpdateHomestayMutationVariables,
} from 'src/gql/graphql';
import { AddressDetails } from './AddressDetails';
// import { SocialsDetails } from './SocialsDetails';
import LoadingSpinner from 'src/components/Loading';
import RichTextEditor from 'src/components/RichTextEditor';
import {  MapComponent } from './MapComponent';
import { MapProvider } from 'src/features/MapProvider';
import { WallpaperGallery } from './gallery/WallpaperGallery';

export const HostelInfo = () => {
  const queryHostelData = useGraphqlClientRequest<
    GetHomestayByTokenQuery,
    GetHomestayByTokenQueryVariables
  >(GetHomestayByToken.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHostelData();
    return res.getHomestayByToken;
  };

  const { data: hostelData, isLoading } = useQuery({
    queryKey: ['getHomestayByToken'],
    queryFn: fetchData,
  });

  return (
    <div className="    grid w-full gap-[1rem]">
      {!isLoading ? (
        <HostelInfoForm
          hostelId={hostelData?.id}
          name={hostelData?.name}
          description={hostelData?.description}
       
        />
      ) : (
        <div className=" relative h-[50vh] w-full">
          <LoadingSpinner color="primary" size="lg" />
        </div>
      )}


      {hostelData?.id && (
        <div>
          <div className="bg-white card-body card card-bordered mb-4">
            <WallpaperGallery homestayId={Number(hostelData.id)} galleryType="ROOM" galleryKey="getRoomImages"  />
          </div>
          {
            <div className="bg-white card-body card card-bordered">
              <HostelTabs hostelId={Number(hostelData.id)} />
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
    { title: 'Address Details', id: 2, comp: <MapProvider><AddressDetails homestayId={hostelId} /></MapProvider> },
  ];
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-full py-5 ">
      <div role="tablist" className="tabs-boxed tabs sticky bg-transparent top-0 z-[99] my-3 flex flex-wrap py-2">
        {tabs.map(tab => (
          <a
            key={tab.id}
            role="tab"
            className={` tab  font-medium ${tab.id == activeTab ? 'tab-active text-white ' : ' text-primary'}`}
            onClick={() => setActiveTab(tab.id)}>
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
              <hr className=" divider" />
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

  const queryClient = useQueryClient();

  const descriptionRef = useRef(description);

  const { setMessage, setRole, setShowToast } = useToastStore();
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
    UpdateHomestayMutation,
    UpdateHomestayMutationVariables
  >(UpdateHomestay.loc?.source.body!);

  const { mutateAsync: updateHostel, isPending } = useMutation({
    mutationFn: mutateUpdateHostelInfo,
  });



  const handleSubmitForm = (data: IProps) => {
    const name = data.name ?? undefined;
    const description = descriptionRef.current ?? "";
 
    if (hostelId) {
      //
      updateHostel({
        homestayId: Number(hostelId),
        input: {
      
          ...(name && {
            name,
          }),
          ...(description && {
            description,
          }),
     
        },
      }).then(res => {
        if (res?.updateHomestay?.id) {
          setShowToast(true);
          setMessage('Homestay Updated');
          setRole('success');
        } else {
          setShowToast(true);
          setMessage('Something went wrong!');
          setRole('error');
        }
      });
    } 
  };

  return (
    <form
      className=" card-body card card-bordered w-full gap-[1rem]  bg-white"
      onSubmit={handleSubmit(handleSubmitForm)}>
      <div className=" grid w-full gap-[1rem] md:grid-cols-2">
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
          />
        </div>

    


      </div>
      <div>
       <RichTextEditor editorRef={descriptionRef}  />
      </div>
      <div className="flex justify-end w-full ">
        <div className=" mt-10 w-[200px]">
          <Button
            label={`${hostelId ? 'Update Homestay Info' : 'Create Homestay Info'}`}
            type="submit"
            loading={isPending}
          />
        </div>
      </div>
    </form>
  );
};

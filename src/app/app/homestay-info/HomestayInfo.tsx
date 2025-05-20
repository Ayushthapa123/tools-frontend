'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import TextInput from 'src/features/react-hook-form/TextField';


import React, { FC, useRef, useState } from 'react';
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
import LoadingSpinner from 'src/components/Loading';
import RichTextEditor from 'src/components/RichTextEditor';
import { MapProvider } from 'src/features/MapProvider';
import { enqueueSnackbar } from 'notistack';

export const HomestayInfo = () => { 
  const queryHomestayData = useGraphqlClientRequest<
    GetHomestayByTokenQuery,
    GetHomestayByTokenQueryVariables
  >(GetHomestayByToken.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHomestayData();
    return res.getHomestayByToken;
  };

  const { data: homestayData, isLoading } = useQuery({
    queryKey: ['getHomestayByToken'],
    queryFn: fetchData,
  });

  return (
    <div className="">
      {!isLoading ? (
        <HomestayInfoForm
          homestayId={homestayData?.data?.id}
          name={homestayData?.data?.name}
          description={homestayData?.data?.description}
       
        />
      ) : (
        <div className=" relative h-[50vh] w-full">
          <LoadingSpinner color="primary" size="lg" />
        </div>
      )}

      {homestayData?.data?.id && (
        <div>
          
          {
            <div className="bg-white card-body card card-bordered">
              <HomestayTabs homestayId={Number(homestayData.data.id)} />
            </div>
          }
        </div>
      )}
    </div>
  );
};

const HomestayTabs = ({ homestayId }: { homestayId: number }) => {
  const tabs = [
    { title: 'Contact Details', id: 1, comp: <ContactDetails homestayId={homestayId} /> },
    { title: 'Address Details', id: 2, comp: <MapProvider><AddressDetails homestayId={homestayId} /></MapProvider> },
  ];
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-full ">
      <div role="tablist" className="tabs-boxed tabs bg-transparent z-[99] mb-2 flex flex-wrap pt-2">
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
              {/* <hr className=" divider" /> */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface IProps {
  homestayId?: string | null;

  name?: string | null;

  description?: string | null;
}

export const HomestayInfoForm: FC<IProps> = props => { 
  const { name, description, homestayId } = props;
  const [ homestayName, setHomestayName ] = useState<string | null>(null);
  const [ homestayDescription, setHomestayDescription ] = useState<string | null>(description ?? null);


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


  const mutateUpdateHomestayInfo = useGraphqlClientRequest<
    UpdateHomestayMutation,
    UpdateHomestayMutationVariables
  >(UpdateHomestay.loc?.source.body!);

  const { mutateAsync: updateHomestay, isPending } = useMutation({
    mutationFn: mutateUpdateHomestayInfo,
  });
  const handleSubmitForm = (data: IProps) => {
    const name = data.name ?? undefined;
    const description = descriptionRef.current ?? "";
 
    if (homestayId) {
      //
      updateHomestay({
        homestayId: Number(homestayId),
        input: {
      
          ...(name && {
            name,
          }),
          ...(description && {
            description,
          }),
     
        },
      }).then(res => {
        if (res?.updateHomestay?.data?.id) {
          enqueueSnackbar("Homestay updated successfully.",{variant:'success'})
        } else {
          enqueueSnackbar("Something went wrong.",{variant:'warning'})
        }
      });
    } 
  };

  return (
    <form
      className="bg-white card-body card w-fit card-bordered gap-[1rem] mb-4"
      onSubmit={handleSubmit(handleSubmitForm)}>
      <div className=" grid gap-[1rem] md:grid-cols-2">
        <div>
          <TextInput
            name="name"
            type="text"
            placeholder="Homestay Name"
            control={control}
            label="Homestay Name"
            required
            onKeyDown={(e)=>setHomestayName(e.key)}
            helpertext={errors.name?.type === 'required' ? 'Name Is Required' : ''}
            error={!!errors.name}
            customType='name'
          />
        </div>

    


      </div>
      <div>
       <RichTextEditor editorRef={descriptionRef} onChange={(e)=>setHomestayDescription(e)} />
      </div>
      <div className="flex justify-end ">
        <div className=" mt-10 w-fit md:w-[200px]">
          <Button
            label={`${homestayId ? 'Update Homestay Info' : 'Create Homestay Info'}`}
            type="submit"
            loading={isPending}
            disabled={(homestayName==null && (homestayDescription == description))}
          />
        </div>
      </div>
    </form>
  );
};

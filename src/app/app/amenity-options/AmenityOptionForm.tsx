'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Button from 'src/components/Button';
import IconButton from 'src/components/IconButton';

import { Modal } from 'src/components/Modal';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextArea from 'src/features/react-hook-form/TextArea';
import TextInput from 'src/features/react-hook-form/TextField';
import {
  AmenityOptionData,
  CreateAmenityOption,
  CreateAmenityOptionMutation,
  CreateAmenityOptionMutationVariables,
  HostelAmenityType,
  UpdateAmenityOption,
  UpdateAmenityOptionMutation,
  UpdateAmenityOptionMutationVariables,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { useUserStore } from 'src/store/userStore';
import EditIcon from 'src/components/icons/Edit';
export const AmenityOptionForm = ({ amenityData }: { amenityData?: AmenityOptionData }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {amenityData ?<IconButton onClick={() => setOpen(true)}> 
        <EditIcon/>
      </IconButton>:<Button label="Add Amenity Option" onClick={() => setOpen(true)} />}
      {open && <AmenityForm open handleClose={handleClose} amenityData={amenityData} />}
    </div>
  );
};

const AmenityForm = ({
  handleClose,
  open,
  amenityData,
}: {
  handleClose: () => void;
  open: boolean;
  amenityData?: AmenityOptionData;
}) => {
  const { user } = useUserStore();
  const { setRole, setShowToast, setMessage } = useToastStore();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<AmenityOptionData>({ defaultValues: { ...amenityData } });

  const mutateCreateAmenityOption = useGraphqlClientRequest<
    CreateAmenityOptionMutation,
    CreateAmenityOptionMutationVariables
  >(CreateAmenityOption.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateCreateAmenityOption });

  const mutateUpdateAmenityOption = useGraphqlClientRequest<
    UpdateAmenityOptionMutation,
    UpdateAmenityOptionMutationVariables
  >(UpdateAmenityOption.loc?.source.body!);

  const { mutateAsync: mutateUpdateAmenityOptionAsync } = useMutation({
    mutationFn: mutateUpdateAmenityOption,
  });

  const onSubmit = async (data: AmenityOptionData) => {
    const { id, ...input } = data;
    if (amenityData) {
    

      mutateUpdateAmenityOptionAsync({
        id: Number(amenityData.id),
        updateAmenityOptionInput: input,
      }).then(res => {
        if (res?.updateAmenityOption?.data?.id) {
          enqueueSnackbar('Amenity Option Updated!', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getAmenityOptions'] });
          handleClose();
        } else {
          enqueueSnackbar(res?.updateAmenityOption?.error?.message || 'Something went wrong!', {
            variant: 'error',
          });
        }
      });
    } else {
      mutateAsync({ createAmenityOptionInput: input }).then(res => {
        if (res?.createAmenityOption?.data?.id) {
          enqueueSnackbar('Amenity Option Created!', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getAmenityOptions'] });
          handleClose();
        }
      });
    }
  };

  const hostelAmenityTypes = [
    {
      label: 'Property Essentials',
      value: HostelAmenityType.PropertyEssentials,
    },
    {
      label: 'Room Essentials',
      value: HostelAmenityType.RoomEssentials,
    },
    {
      label: 'Bathroom Essentials',
      value: HostelAmenityType.BathroomEssentials,
    },
    {
      label: 'Kitchen Essentials',
      value: HostelAmenityType.KitchenEssentials,
    },
    {
      label: 'Safety And Hygiene',
      value: HostelAmenityType.SafetyAndHygeneEssentials,
    },
    {
      label: 'Other',
      value: HostelAmenityType.Other,
    },
  ];

  return (
    <div>
      <Modal
        open={open}
        handleClose={handleClose}
        onSave={handleSubmit(onSubmit)}
        title={amenityData ? 'Edit Amenity Option' : 'Add Amenity Option'}
        actionLabel="Save"
      >
        <div className="bg-red-300 ">
          <form className="bg-white text-left ">
            <div className="w-full py-3 ">
              <div className="">
                <TextInput
                  name="name"
                  placeholder="Amenity Name"
                  control={control}
                  label="Amenity Name"
                  required
                  helpertext={errors.name?.type === 'required' ? 'Amenity Name Is Required' : ''}
                  error={!!errors.name}
                />
              </div>

              <div className="mt-3 ">
                <TextArea
                  name="description"
                  placeholder="Describe it with distance,direction and other info"
                  type="text"
                  control={control}
                  label="Amenity Description"
                  required
                  error={!!errors.description}
                  rows={3}
                />
              </div>
              <div>
                <div>
                  <ReactSelect
                    name="hostelAmenityType"
                    placeholder="Amenity Type"
                    control={control}
                    options={hostelAmenityTypes}
                    label="Amenity Type"
                    required
                    helperText={
                      errors.hostelAmenityType?.type === 'required'
                        ? 'Amenity Type Is Required'
                        : ''
                    }
                    error={!!errors.hostelAmenityType}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

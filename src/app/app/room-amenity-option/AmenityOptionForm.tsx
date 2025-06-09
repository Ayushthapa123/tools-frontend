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
  RoomAmenityOptionData,
  CreateRoomAmenityOption,
  CreateRoomAmenityOptionMutation,
  CreateRoomAmenityOptionMutationVariables,
  UpdateRoomAmenityOption,
  UpdateRoomAmenityOptionMutation,
  UpdateRoomAmenityOptionMutationVariables,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { useUserStore } from 'src/store/userStore';
import EditIcon from 'src/components/icons/Edit';
export const AmenityOptionForm = ({ amenityData }: { amenityData?: RoomAmenityOptionData }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {amenityData ?<IconButton onClick={() => setOpen(true)}> 
        <EditIcon/>
      </IconButton>:<Button label="Add Room Amenity Option" onClick={() => setOpen(true)} />}
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
  amenityData?: RoomAmenityOptionData;
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
  } = useForm<RoomAmenityOptionData>({ defaultValues: { ...amenityData } });

  const mutateCreateAmenityOption = useGraphqlClientRequest<
    CreateRoomAmenityOptionMutation,
    CreateRoomAmenityOptionMutationVariables
  >(CreateRoomAmenityOption.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateCreateAmenityOption });

  const mutateUpdateAmenityOption = useGraphqlClientRequest<
    UpdateRoomAmenityOptionMutation,
    UpdateRoomAmenityOptionMutationVariables
  >(UpdateRoomAmenityOption.loc?.source.body!);

  const { mutateAsync: mutateUpdateAmenityOptionAsync } = useMutation({
    mutationFn: mutateUpdateAmenityOption,
  });

  const onSubmit = async (data: RoomAmenityOptionData) => {
    const { id, ...input } = data;
    if (amenityData) {
    

      mutateUpdateAmenityOptionAsync({
        id: Number(amenityData.id),
        updateRoomAmenityOptionInput: input,
      }).then(res => {
        if (res?.updateRoomAmenityOption?.data?.id) {
          enqueueSnackbar('Amenity Option Updated!', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getRoomAmenityOptions'] });
          handleClose();
        } else {
          enqueueSnackbar(res?.updateRoomAmenityOption?.error?.message || 'Something went wrong!', {
            variant: 'error',
          });
        }
      });
    } else {
      mutateAsync({ createRoomAmenityOptionInput: input }).then(res => {
        if (res?.createRoomAmenityOption?.data?.id) {
          enqueueSnackbar('Amenity Option Created!', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getRoomAmenityOptions'] });
          handleClose();
        }
      });
    }
  };

 

  return (
    <div>
      <Modal
        open={open}
        handleClose={handleClose}
        onSave={handleSubmit(onSubmit)}
        title={amenityData ? 'Edit Room Amenity Option' : 'Add Room Amenity Option'}
        actionLabel="Save"
      >
        <div className="bg-red-300 ">
          <form className="bg-white text-left ">
            <div className="w-full py-3 ">
              <div className="">
                <TextInput
                  name="name"
                  placeholder="Room Amenity Name"
                  control={control}
                  label="Room Amenity Name"
                  required
                  helpertext={errors.name?.type === 'required' ? 'Room Amenity Name Is Required' : ''}
                  error={!!errors.name}
                />
              </div>

              <div className="mt-3 ">
                <TextArea
                  name="description"
                  placeholder="Describe it with distance,direction and other info"
                  type="text"
                  control={control}
                  label="Room Amenity Description"
                  // required
                  error={!!errors.description}
                  rows={3}
                />
              </div>
              <div>
               
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

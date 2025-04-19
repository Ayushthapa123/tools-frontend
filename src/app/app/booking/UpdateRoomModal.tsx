'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import IconButton from 'src/components/IconButton';
import EditIcon from 'src/components/icons/Edit';

import { Modal } from 'src/components/Modal';
import TextArea from 'src/features/react-hook-form/TextArea';
import TextInput from 'src/features/react-hook-form/TextField';
import {
  UpdateRoom,
  UpdateRoomMutation,
  UpdateRoomMutationVariables,
  RoomCapacity,
  RoomStatus,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { useUserStore } from 'src/store/userStore';

export const UpdateRoomModal = ({
  id,
  caption,
  roomNumber,
  status,
  capacity,
}: {
  id: number | string;
  caption: string;
  roomNumber: string;
  status: RoomStatus;
  capacity: RoomCapacity;
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      {open && (
        <RoomForm
          open
          handleClose={handleClose}
          id={id}
          caption={caption}
          roomNumber={roomNumber}
          status={status}
          capacity={capacity}
        />
      )}
    </div>
  );
};

interface IUpdateRoom {
  status: RoomStatus;
  capacity: RoomCapacity;
  caption: string;
  roomNumber: string;
}

export const RoomForm = ({
  handleClose,
  open,
  id,
  caption,
  roomNumber,
  status,
  capacity,
}: {
  handleClose: () => void;
  open: boolean;
  id: number | string;
  caption: string;
  roomNumber: string;
  status: RoomStatus;
  capacity: RoomCapacity;
}) => {
  const { user } = useUserStore();
  const { setRole, setShowToast, setMessage } = useToastStore();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUpdateRoom>({
    defaultValues: {
      status,
      capacity,
      caption,
      roomNumber,
    },
  });

  const mutateUpdateRoom = useGraphqlClientRequest<
    UpdateRoomMutation,
    UpdateRoomMutationVariables
  >(UpdateRoom.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateUpdateRoom });

  const onSubmit = async (data: IUpdateRoom) => {
    const input = { ...data, id: Number(id) };
    mutateAsync({ updateRoomInput: input }).then(res => {
      if (res?.updateRoom?.id) {
        setShowToast(true);
        setMessage('Room Updated!');
        setRole('success');
        queryClient.invalidateQueries({ queryKey: ['getRooms'] });
        handleClose();
      } else {
        setShowToast(true);
        setMessage('Something went wrong!');
        setRole('error');
      }
    });
  };

  return (
    <div>
      <Modal
        open={open}
        handleClose={handleClose}
        onSave={handleSubmit(onSubmit)}
        title="Update Room"
        actionLabel="Save">
        <div className="bg-white">
          <form className="bg-white text-left">
            <div className="w-full py-3">
              <div className="mb-3">
                <TextInput
                  name="caption"
                  placeholder="Room Caption"
                  control={control}
                  label="Room Caption"
                  required
                  helpertext={errors.caption?.type === 'required' ? 'Caption is Required' : ''}
                  error={!!errors.caption}
                />
              </div>
              <div className="mb-3">
                <TextInput
                  name="roomNumber"
                  placeholder="Room Number"
                  control={control}
                  label="Room Number"
                  required
                  helpertext={errors.roomNumber?.type === 'required' ? 'Room Number is Required' : ''}
                  error={!!errors.roomNumber}
                />
              </div>

              <div className="mb-3">
                <select
                  {...control.register('status')}
                  className="w-full rounded border p-2">
                  <option value={RoomStatus.Available}>Available</option>
                  <option value={RoomStatus.Idle}>Occupied</option>
                </select>
              </div>

              <div className="mb-3">
                <select
                  {...control.register('capacity')}
                  className="w-full rounded border p-2">
                  <option value={RoomCapacity.OneBed}>Single</option>
                  <option value={RoomCapacity.TwoBed}>Double</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

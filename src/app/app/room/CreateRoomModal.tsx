'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdAddCircleOutline } from 'react-icons/md';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';

import { Modal } from 'src/components/Modal';
import TextArea from 'src/features/react-hook-form/TextArea';
import TextInput from 'src/features/react-hook-form/TextField';
import {
  CreateRoom,
  CreateRoomMutation,
  CreateRoomMutationVariables,
  RoomCapacity,
  RoomStatus,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { useUserStore } from 'src/store/userStore';

export const CreateRoomModal = () => {
  const [ open, setOpen ] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Link href="/app/room/new">
        <Button label="Add Room" onClick={() => setOpen(true)} ></Button></Link>

    </div>
  );
};

interface ICreateRoom {
  status: RoomStatus;
  capacity: RoomCapacity;
  caption: string;
  roomNumber: string;
}

export const RoomForm = ({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}) => {
  const { user } = useUserStore();
  const { setRole, setShowToast, setMessage } = useToastStore();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateRoom>({
    defaultValues: {
      status: RoomStatus.Available,
      capacity: RoomCapacity.OneBed,
      caption: '',
      roomNumber: '',
    },
  });

  const mutateCreateRoom = useGraphqlClientRequest<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >(CreateRoom.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateCreateRoom });

  const onSubmit = async (data: ICreateRoom) => {
    const input = { ...data, homestayId: Number(user.homestayId) };
    mutateAsync({ createRoomInput: input }).then(res => {
      if (res?.createRoom?.id) {
        setShowToast(true);
        setMessage('Room Created!');
        setRole('success');
        queryClient.invalidateQueries({ queryKey: [ 'getRooms' ] });
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
        title="Add Room"
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

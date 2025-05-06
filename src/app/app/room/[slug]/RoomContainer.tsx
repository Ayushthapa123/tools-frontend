"use client"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';


import {
  CreateRoom,
  CreateRoomInput,
  CreateRoomMutation,
  CreateRoomMutationVariables,

  GetRoomWithPriceAndGallery,
  GetRoomWithPriceAndGalleryQuery,
  GetRoomWithPriceAndGalleryQueryVariables,
  Price,
  Room,
  RoomCapacity,
  RoomImage,
  RoomStatus,
  UpdateRoom,
  UpdateRoomMutation,
  UpdateRoomMutationVariables,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { useUserStore } from 'src/store/userStore';
import { Suspense, useEffect, useState } from 'react';
import SetPriceForm from './SetPriceForm';
import UploadPhotos from './UploadPhotosForm';
import {RoomCreateForm} from './RoomCreateForm';
import Button from 'src/components/Button';


export default function RoomContainer({ params }: { params: { slug: string } }) {

  const isEdit = params?.slug !== "new";

    
  const queryRoom = useGraphqlClientRequest<
  GetRoomWithPriceAndGalleryQuery,
  GetRoomWithPriceAndGalleryQueryVariables
>(GetRoomWithPriceAndGallery.loc?.source?.body!);

//initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
const fetchData = async () => {
  const res = await queryRoom({id: Number(params?.slug)});
  return res.room;
};

const { data: room ,isLoading} = useQuery({
  queryKey: ['getRoomWithPriceAndGallery', params?.slug],
  queryFn: fetchData,
  enabled: isEdit,
});
console.log(room);
  return <Suspense><div>{!isLoading &&<RoomForm params={params} room={room as Room | undefined} />}</div></Suspense>;
}

 function RoomForm({ params, room }: { params: { slug: string }, room: Room | undefined | null }) {
  const slug = params?.slug;
  const isEdit = slug !== "new";
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(Number(searchParams.get('step')    ) || 1); 

  const { user } = useUserStore();
  const { setRole, setShowToast, setMessage } = useToastStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<CreateRoomInput>({
    defaultValues: {
     roomNumber: room?.roomNumber,
     caption: room?.caption,
     capacity: room?.capacity??RoomCapacity.OneBed,
     description: room?.description,
     status: room?.status??RoomStatus.Available,
     maxOccupancy: room?.maxOccupancy,
     attachBathroom: room?.attachBathroom,
  
    },
  });
   
  useEffect(() => {
    if (room) {
      reset({
        roomNumber: room.roomNumber,
        caption: room.caption,
        capacity: room.capacity ?? RoomCapacity.OneBed,
        description: room.description,
        status: room.status ?? RoomStatus.Available,
        maxOccupancy: room.maxOccupancy ?? "1",
        attachBathroom: room.attachBathroom ?? false,
      });
    }
  }, [room]);
//This ensures the form updates when room is fetched from the backend.


  const mutateCreateRoom = useGraphqlClientRequest<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >(CreateRoom.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateCreateRoom });

  const mutateUpdateRoom = useGraphqlClientRequest<
  UpdateRoomMutation,
  UpdateRoomMutationVariables
>(UpdateRoom.loc?.source.body!);

const { mutateAsync: mutateUpdateRoomAsync } = useMutation({ mutationFn: mutateUpdateRoom });


  const onSubmit = async (data: CreateRoomInput) => {
    if (currentStep === 1) {
      const input = { ...data, homestayId: Number(user.hostelId) };
      if (!isEdit) {

      mutateAsync({ createRoomInput: input }).then(res => {
        if (res?.createRoom?.id) {
          setShowToast(true);
          setMessage('Room Created!');
          setRole('success');
          queryClient.invalidateQueries({ queryKey: ['getRooms'] });
          router.push(`/app/room/${res?.createRoom?.id}?step=2`);
          setCurrentStep(2);
        } else {
          setShowToast(true);
          setMessage('Something went wrong!');
          setRole('error');
        }
      });
    }else {
      mutateUpdateRoomAsync({ updateRoomInput: { ...input, id: Number(room?.id) } }).then(res => {
        if (res?.updateRoom?.id) {
          setShowToast(true);
          setMessage('Room Updated!');
          setRole('success');
          queryClient.invalidateQueries({ queryKey: ['getRooms'] });
          router.push(`/app/room/${res?.updateRoom?.id}?step=2`);
          setCurrentStep(2);
        } else {
          setShowToast(true);
          setMessage('Something went wrong!');
          setRole('error');
        }
      });
    }

    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else {
      router.push(`/app/room`);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // also handle the if it is isEdit then the button text should be 'Update'
  const buttonText = currentStep == 3 ? 'Finish' :  currentStep == 2 ? 'Set Price' : isEdit ? 'Update' : 'Create Room';

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <div className="flex justify-center items-center mb-4">
            {/* <h2 className="text-xl font-semibold">Step {currentStep} of 3</h2> */}
            <div className="steps steps-horizontal text-gray-600">
              <div className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Room Details</div>
              <div className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Set Price</div>
              <div className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>Upload Photos</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && <RoomCreateForm control={control} errors={errors} />}
        

        <div className='flex justify-end'>
          <div className="flex justify-end mt-6 gap-2 ">
          {currentStep === 1 && isEdit && <Button label="Next" onClick={handleNext} className='btn-primary w-min btn' />}
         
            { currentStep === 1 && <Button 
              type={currentStep === 1  ? 'submit' : 'button'}
              className={`btn btn-primary  w-min`} 
              label={buttonText}
            />
              }
          </div>
          </div>
        </form>
        {currentStep === 2 && <SetPriceForm price={room?.price as Price | undefined} roomId={Number(room?.id) } onNext={handleNext} handleBack={handleBack} />}
        {currentStep === 3 && <UploadPhotos  handleBack={handleBack} roomImages={room?.image as RoomImage[]} roomId={Number(room?.id) } />}
      </div>
    </div>
  );
}



  
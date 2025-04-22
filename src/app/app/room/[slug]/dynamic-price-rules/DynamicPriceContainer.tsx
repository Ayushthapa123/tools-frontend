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

  DynamicPricingRule,

  GetPriceRulesByRoom,

  GetPriceRulesByRoomQuery,

  GetPriceRulesByRoomQueryVariables,

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
import { Suspense, useState } from 'react';

import Button from 'src/components/Button';
  import { GetRulesQuery, GetRulesQueryVariables } from 'src/gql/graphql';

export default function DynamicPriceContainer({ roomId }: { roomId: number }) {

  const isEdit = Boolean(roomId);

  const queryDynamicPriceRules = useGraphqlClientRequest<
  GetPriceRulesByRoomQuery,
  GetPriceRulesByRoomQueryVariables
>(GetPriceRulesByRoom.loc?.source?.body!);

//initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
const fetchData = async () => {
  const res = await queryDynamicPriceRules({roomId: Number(roomId)});
  return res.priceRulesByRoom;
};

const { data: rules ,isLoading} = useQuery({
  queryKey: ['getPriceRulesByRoom', roomId],
  queryFn: fetchData,
  enabled: isEdit,
});
console.log(rules);
  return <Suspense><div>{!isLoading &&<RulesForm rules={rules as DynamicPricingRule | undefined} roomId={roomId} />}</div></Suspense>;
}

  function RulesForm({ roomId, rules }: { roomId: number, rules: DynamicPricingRule | undefined | null }) {
  const isEdit = Boolean(roomId);
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
  } = useForm<CreateRoomInput>({
    defaultValues: {
     
  
    },
  });



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
      mutateUpdateRoomAsync({ updateRoomInput: { ...input, id: Number(roomId) } }).then(res => {
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
      map the details
   
      </div>
    </div>
  );
}



  
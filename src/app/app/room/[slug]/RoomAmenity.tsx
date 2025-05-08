"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGraphqlClientRequest } from "src/client/useGraphqlClientRequest";
import { CreateRoomAmenity, CreateRoomAmenityMutation, CreateRoomAmenityMutationVariables, FindAmenityByRoomId, FindAmenityByRoomIdQuery, FindAmenityByRoomIdQueryVariables, UpdateRoomAmenity, UpdateRoomAmenityMutation, UpdateRoomAmenityMutationVariables } from "src/gql/graphql";
import { useToastStore } from "src/store/toastStore";
import { roomAmenities } from "../../data/roomAmenity";
import { Input } from "src/components/Input";
import Button from "src/components/Button";
import LoadingSpinner from "src/components/Loading";

export default function RoomAmenityPage({ handleBack, roomId }: { handleBack: () => void, roomId: number }) {
  
  const [ selectedRoomAmenity, setSelectedRoomAmenity ] = useState<string[]>([]);
  const router = useRouter();
  const { setRole, setShowToast, setMessage } = useToastStore();
  const queryClient = useQueryClient();

  // room amenity fetching
  const queryValidity = useGraphqlClientRequest<FindAmenityByRoomIdQuery,FindAmenityByRoomIdQueryVariables>(FindAmenityByRoomId.loc?.source?.body!);
  const getRoomAmenities=async()=>{
    const res=await queryValidity({
      roomId:roomId
    })
    return res.findAmenityByRoomId
  }
  const {data,isLoading}=useQuery({
    queryKey:['getRoomAmenities'],
    queryFn:()=>getRoomAmenities()
  })

  useEffect(() => {
    if (data?.amenity) {
      setSelectedRoomAmenity(data.amenity.split(","));
    }
  }, [data?.amenity]);

  //create room amenity 
  const mutateRoomAmenity = useGraphqlClientRequest<
      CreateRoomAmenityMutation,
      CreateRoomAmenityMutationVariables
    >(CreateRoomAmenity.loc?.source.body!);
  
  const { mutateAsync } = useMutation({ mutationFn: mutateRoomAmenity });

  //update room amenity 
  const updateRoomAmenity = useGraphqlClientRequest<
      UpdateRoomAmenityMutation,
      UpdateRoomAmenityMutationVariables
    >(UpdateRoomAmenity.loc?.source.body!);
  
  const { mutateAsync:updateAmenity } = useMutation({ mutationFn: updateRoomAmenity });
  
  const handleToggle = (name: string) => {
    setSelectedRoomAmenity((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [ ...prev, name ]
    );
  };


  const handleFinish = () => {
    router.push(`/app/room`);
  };

  const handleSave = () => {
    if (!data?.roomAmenityId) {
      mutateAsync({ createAmenityInput: { roomId, amenity: selectedRoomAmenity.join(",") } }).then((res) => {
        if (res?.createRoomAmenity.roomAmenityId) {
          setShowToast(true);
          queryClient.invalidateQueries({ queryKey: ['getRoomAmenities'] });
          setMessage('Amenities Created Successfully!');
          setRole('success');
        }
        else {
          setShowToast(true);
          setMessage('Amenities Not Created!');
          setRole('error');
        }
      })
    }
    else {
      updateAmenity({updateAmenityInput:{roomAmenityId:Number(data?.roomAmenityId), amenity:selectedRoomAmenity.join(",")}}).then((res) => {
        if (res?.updateRoomAmenity.roomAmenityId) {
          setShowToast(true);
          queryClient.invalidateQueries({ queryKey: ['getRoomAmenities'] });
          setMessage('Amenities Updated Successfully!');
          setRole('success');
        }
        else {
          setShowToast(true);
          setMessage('Amenities Not Updated!');
          setRole('error');
        }
      })
    }
  };

  if(isLoading) return (
    <LoadingSpinner color='primary' size='lg' />
  )

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Room Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 items-center">
        {roomAmenities?.map((amenity) => (
          <label
            key={amenity.id}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors border border-gray-200 hover:bg-blue-50 ${selectedRoomAmenity.includes(amenity.name) ? "bg-blue-100 border-blue-400" : "bg-white"}`}
          >
            {/* <img src={amenity.iconUrl} alt={amenity.name} className="w-7 h-7" /> */}
            <div className="flex items-center gap-3">
              <div className="mb-6">
                <Input
                  type="checkbox"
                  checked={selectedRoomAmenity.includes(amenity.name)}
                  onChange={() => handleToggle(amenity.name)}
                  className="w-5 h-5"
                // style={{ minWidth: 20 }}
                />
              </div>
              <div>
                <span className={` text-gray-700 ${selectedRoomAmenity.includes(amenity.name) ? "font-semibold text-primary" : ""}`}>{amenity.name}</span>
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="flex gap-3 justify-between">
        <div>
        <Button label="Back" onClick={handleBack} className="w-fit" />
        </div>
        <div className="flex gap-3">
        <Button label="Save Amenities" variant="primary" onClick={handleSave} />
        <Button label="Done" variant="primary" onClick={handleFinish} />
        </div>
      </div>
    </div>
  );
}

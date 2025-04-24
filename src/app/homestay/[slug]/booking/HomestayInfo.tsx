'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { CustomChip } from 'src/components/Chip';
import RichTextEditor from 'src/components/RichTextEditor';
import { Room, RoomCapacity, RoomStatus } from 'src/gql/graphql';
import { RoomCardFull } from './RoomCardFull';
import { useSearchParams } from 'next/navigation';


interface HomestayInfoProps {
  name: string;
  description: string;
  address: {
    city: string;
    country: string;
    street?: string;
    subCity?: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  images?: string[];
  rooms?: Room[];
  selectedRoomId?: string;
  slug: string;
  onRoomSelect?: (roomId: string) => void;
}

export const HomestayInfo = ({
  name,
  description,
  address,
  contact,
  images,
  rooms,
  selectedRoomId,
  slug,
}: HomestayInfoProps) => {
  const searchParams = useSearchParams();
  const editorRef = useRef(description);
  const sectionRef = useRef<HTMLDivElement>(null);
  const checkInDate = searchParams.get('checkInDate') ?? '';
  const checkOutDate = searchParams.get('checkOutDate') ?? '';
  const selectedRoom = rooms?.find((room) => room.id == selectedRoomId);
  const remainingRooms = rooms?.filter((room) => room.id != selectedRoomId)
  console.log("selected room", selectedRoom);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (remainingRooms && remainingRooms?.length > 4) {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [ selectedRoomId ]);
  return (
    <div className="space-y-6">
      {/* <div className="relative h-64 w-full overflow-hidden rounded-lg">
        {images && images.length > 0 ? (
          <Image
            src={images[Number(selectedRoomId)-1]}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div> */}

      <div className="space-y-4">
        {/* <h1 className="text-2xl font-bold">{name}</h1>
        <RichTextEditor
        readOnly={true}
        editorRef={editorRef}
        />

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Location</h2>
          <div className="space-y-1">
            <p>{address.street} {address.subCity} {address.city} {address.country}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Contact</h2>
          <div className="space-y-1">
            <p>Phone: {contact.phone}</p>
            <p>Email: {contact.email}</p>
          </div>
        </div> */}

        <div className="space-y-2" ref={sectionRef}>
          <h2 className="text-lg font-semibold">All Available Rooms <p className='font-extralight text-[5px] inline-block'>(You can choose multiple rooms as well.)</p></h2>

          <div className="grid grid-cols-1 gap-4 h-[250px]">
            <RoomCardFull checkInDate={checkInDate} checkOutDate={checkOutDate} isSelected={true} room={selectedRoom as Room} key={selectedRoom?.id} slug={slug} />
            {remainingRooms?.map((room) => (
              <RoomCardFull
                key={room.id}
                slug={slug}
                room={room}
                isSelected={selectedRoomId === room.id}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 
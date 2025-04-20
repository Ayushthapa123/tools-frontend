'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { CustomChip } from 'src/components/Chip';
import RichTextEditor from 'src/components/RichTextEditor';
import { Room, RoomCapacity, RoomStatus } from 'src/gql/graphql';
import { RoomCardFull } from './RoomCardFull';


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

}: HomestayInfoProps) => {
  const editorRef = useRef(description);
  return (
    <div className="space-y-6">
      <div className="relative h-64 w-full overflow-hidden rounded-lg">
        {images && images.length > 0 ? (
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{name}</h1>
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
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Available Rooms</h2>
          <div className="grid grid-cols-1 gap-4 h-[250px]">
            {rooms?.map((room) => (
              <RoomCardFull
                key={room.id}
                room={room}
                isSelected={selectedRoomId === room.id}
               
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 
'use client';
import React, { useState } from 'react';
import { Hostel, RoomData } from 'src/gql/graphql';
import { RoomCardFull } from '../application/RoomCardFull';
import ShowDetails from '../../room-details/ShowDetails';

// TODO: PLEASE SOLVE THE HYDRATION ERROR
export default function HostelRooms({ hostel }: { hostel: Hostel | null | undefined }) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);

  return (
    <div className="grid grid-cols-1 gap-6">
      {showDetails && (
        <div className="">
          <ShowDetails setShowDetails={setShowDetails} room={selectedRoom as RoomData} />
        </div>
      )}
      {hostel?.data?.rooms?.map((room: RoomData) => (
        <div
          key={room.id}
          className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-md">
          <RoomCardFull
            room={room}
            setSelectedRoom={setSelectedRoom}
            setShowDetails={setShowDetails}
            isSelected={false}
            slug={hostel?.data?.slug ?? ''}
            checkInDate={''}
            checkOutDate={''}
          />
        </div>
      ))}
    </div>
  );
}

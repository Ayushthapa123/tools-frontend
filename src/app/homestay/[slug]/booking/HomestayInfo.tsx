'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CustomChip } from 'src/components/Chip';
import RichTextEditor from 'src/components/RichTextEditor';
import { Room, RoomCapacity, RoomStatus } from 'src/gql/graphql';
import { RoomCardFull } from './RoomCardFull';
import { useSearchParams } from 'next/navigation';
import { CiLocationOn } from 'react-icons/ci';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRoomStore } from 'src/store/roomStore';

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
  const { setRoomIds, roomIds } = useRoomStore();
  const editorRef = useRef(description);
  const sectionRef = useRef<HTMLDivElement>(null);
  const checkInDate = searchParams.get('checkInDate') ?? '';
  const checkOutDate = searchParams.get('checkOutDate') ?? '';
  const selectedRooms = rooms?.filter((room) => 
    roomIds.includes(room.id)
  )
  const remainingRooms = rooms?.filter((room) => !roomIds.includes(room.id));
  const isFirstRender = useRef(true);
  const [ activeTab, setActiveTab ] = useState('rooms');

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (selectedRoomId && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [ selectedRoomId ]);

  return (
    <>
      <div className="">
        {/* Property Header */}
        <div className="">
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
        </div>


        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <nav className=" flex space-x-8">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'rooms'
                ? 'border-blue-500 text-blue'
                : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700'
                }`}
            >
              Available Rooms
            </button>
            <button
              onClick={() => setActiveTab('description')}
              className={`border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'description'
                ? 'border-blue-500 text-blue'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'contact'
                ? 'border-blue-500 text-blue'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
            >
              Contact Info
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Rooms Tab */}
          {activeTab === 'rooms' && (
            <div className="space-y-3" ref={sectionRef}>
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Available Rooms</h2>
                <div className="rounded-full p-2 px-4 text-xs font-extralight text-blue border border-blue">
                  <FaInfoCircle className="mr-2 inline text-lg" />
                  You can select multiple rooms
                </div>
              </div>

              <div className="space-y-4">
                {selectedRooms && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-l-4 border-blue pl-2 space-y-4" 
                  >
                    <h3 className="mb-2 text-lg font-medium text-gray-600">Selected Room(s)</h3>
                    {selectedRooms.map((selectedRoom) => (
                      <RoomCardFull
                        key={selectedRoom.id}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        isSelected={true}
                        room={selectedRoom}
                        slug={slug}
                    />
                    ))}
                  </motion.div>
                )}

                {(!rooms || rooms.length === 0) && (
                  <div className="rounded-lg bg-yellow-50 p-4 text-center text-yellow-800">
                    No rooms are currently available for this property.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="rounded-lg bg-white p-4">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">About This Property</h2>
              <div className="prose max-w-none">
                <RichTextEditor editorRef={editorRef} readOnly={true} />
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-4 rounded-lg bg-white p-4">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Contact Information</h2>

              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-3 text-lg font-medium text-gray-700">Location</h3>
                <div className="mt-2 flex items-center text-gray-600">
                  <CiLocationOn className="mr-1 text-xl text-blue" />
                  <span>
                    {[ address.street, address.subCity, address.city, address.country ]
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-3 text-lg font-medium text-gray-700">Contact Details</h3>
                <div className="ml-1 space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MdPhone className="mr-2 text-blue" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdEmail className="mr-2 text-blue" />
                    <span>{contact.email}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {activeTab!=="description" && activeTab!=="contact" && remainingRooms && remainingRooms.length > 0 && (
        <div className="mt-8 border-t-2 border-gray-300 pt-2">
          <h3 className="mb-4 text-lg font-medium text-gray-700">Other Available Options</h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
            {remainingRooms.map((room) => (
              <RoomCardFull
                key={room.id}
                slug={slug}
                room={room}
                isSelected={false}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CustomChip } from 'src/components/Chip';
import RichTextEditor from 'src/components/RichTextEditor';
import { RoomData, RoomCapacity, RoomStatus } from 'src/gql/graphql';
import { RoomCardFull } from './RoomCardFull';
import { useSearchParams } from 'next/navigation';
import { CiLocationOn } from 'react-icons/ci';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRoomStore } from 'src/store/roomStore';
import { AmenityDisplay } from 'src/features/amenity/DisplayAmenity';
import ShowDetails from 'src/app/hostel/room-details/ShowDetails';
import { Services } from 'src/features/services';

interface HostelInfoProps {
  name: string;
  description: string;
  hostelId: number;
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
  rooms?: RoomData[];
  selectedRoomId?: string;
  slug: string;
  onRoomSelect?: (roomId: string) => void;
}

export const HostelInfo = ({
  name,
  hostelId,
  description,
  address,
  contact,
  images,
  rooms,
  selectedRoomId,
  slug,
}: HostelInfoProps) => {
  const searchParams = useSearchParams();
  const { setRoomIds, roomIds } = useRoomStore();
  const editorRef = useRef(description);
  const sectionRef = useRef<HTMLDivElement>(null);
  const checkInDate = searchParams.get('checkInDate') ?? '';
  const checkOutDate = searchParams.get('checkOutDate') ?? '';
  const selectedRooms = rooms?.filter(room => roomIds.includes(room.id));
  const remainingRooms = rooms?.filter(room => !roomIds.includes(room.id));
  const isFirstRender = useRef(true);
  const [activeTab, setActiveTab] = useState('rooms');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);

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
  }, [selectedRoomId]);

  return (
    <>
      {showDetails && (
        <ShowDetails setShowDetails={setShowDetails} room={selectedRoom as RoomData} />
      )}
      <div>
        <div className="">
          {/* Property Header */}
          <div className="">
            <h1 className="text-2xl font-bold text-primary">{name}</h1>
          </div>
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className=" flex justify-between space-x-2">
              <button
                onClick={() => setActiveTab('rooms')}
                className={` border-b-2 py-4  text-sm font-medium ${
                  activeTab === 'rooms'
                    ? 'border-blue text-blue'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Available Rooms
              </button>
              <button
                onClick={() => setActiveTab('description')}
                className={`border-b-2 py-4 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-blue text-blue'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`text-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === 'contact'
                    ? 'border-blue text-blue'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Contact Info
              </button>
              <button
                onClick={() => setActiveTab('amenity')}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === 'amenity'
                    ? 'border-blue text-blue'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Amenities
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === 'services'
                    ? 'border-blue text-blue'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Services
              </button>
            </nav>
          </div>
          {/* Tab Content */}
          <div className="mt-6">
            {/* Rooms Tab */}
            {activeTab === 'rooms' && (
              <div className="space-y-3" ref={sectionRef}>
                <div className="flex flex-col items-start justify-between lg:flex-row">
                  <h2 className=" text-md font-semibold text-gray-800 lg:text-xl">
                    Available Rooms
                  </h2>
                  <div className="rounded-full border border-blue p-2 px-4 text-xs font-extralight text-blue">
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
                      className="space-y-4 border-l-4 border-blue pl-2"
                    >
                      <h3 className="mb-2 text-lg font-medium text-gray-600">Selected Room(s)</h3>
                      {selectedRooms.map(selectedRoom => (
                        <RoomCardFull
                          key={selectedRoom.id}
                          checkInDate={checkInDate}
                          checkOutDate={checkOutDate}
                          isSelected={true}
                          room={selectedRoom}
                          slug={slug}
                          setShowDetails={setShowDetails}
                          setSelectedRoom={setSelectedRoom}
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
            {/* Amenity Tab */}
            {activeTab === 'amenity' && (
              <div className="rounded-lg bg-white p-4">
                <div className="prose max-w-none">
                  <AmenityDisplay hostelId={hostelId} key={hostelId} showAll={true} />
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="rounded-lg bg-white p-4">
                <div className="prose max-w-none">
                  <Services hostelId={hostelId} key={hostelId} />
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
                      {[address.street, address.subCity, address.city, address.country]
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
        {activeTab !== 'description' &&
          activeTab !== 'contact' &&
          remainingRooms &&
          remainingRooms.length > 0 && (
            <div className="mt-8 border-t-2 border-gray-300 pt-2">
              <h3 className="mb-4 text-lg font-medium text-gray-700">Other Available Options</h3>
              <div className="max-h-[600px] space-y-4 overflow-y-auto pr-4">
                {remainingRooms.map(room => (
                  <RoomCardFull
                    setShowDetails={setShowDetails}
                    setSelectedRoom={setSelectedRoom}
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
      </div>
    </>
  );
};

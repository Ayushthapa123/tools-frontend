import { Room, RoomStatus } from "src/gql/graphql";
import Image from "next/image";
import { useRoomStore } from "src/store/roomStore";
interface RoomCardProps {
    room: Room;
    isSelected: boolean;
  
  }
  
  export const RoomCardFull = ({ room, isSelected }: RoomCardProps) => {
    const {setRoomIds,roomIds}=useRoomStore()
    const handleRoomSelect = (roomId: string) => {
      if(roomIds.includes(roomId)){
        setRoomIds(roomIds.filter((id) => id !== roomId))
      }else{
        setRoomIds([...roomIds,roomId])
      }
    }
    return (
      <div
        onClick={() => handleRoomSelect(room.id)}
        className={`card card-side h-[300px] bg-base-100 shadow-md hover:shadow-lg transition-all cursor-pointer ${
          isSelected ? 'border-2 border-primary bg-primary/5' : 'border border-base-200'
        }`}
      >
        {/* Left side - Image */}
        <figure className="w-[300px] h-full">
          {room.image && room.image.length > 0 ? (
            <div className="relative h-full w-full">
              <Image
                src={room.image[0].url}
                alt={room.caption}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-full w-full bg-base-200 flex items-center justify-center">
              <svg 
                className="h-12 w-12 text-base-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
          )}
        </figure>
  
        <div className="card-body p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              {/* Header Section */}
              <div>
                <h3 className="card-title text-lg">{room.caption}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="badge badge-outline">
                    Room {room.roomNumber || 'N/A'}
                  </span>
                  <span className="badge badge-outline badge-primary">
                    {room.capacity}
                  </span>
                </div>
              </div>
  
              {/* Price Section */}
              {room.price && (
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">
                    {room.price.isDynamicPricing ? room.price.dynamicAmount : room.price.baseAmount} {room.price.currency}
                  </span>
                  <span className="text-sm text-base-content/60">/night</span>
                </div>
              )}
  
              {/* Features Section */}
              <div className="flex flex-wrap gap-2 mt-3">
                <div className={`badge ${
                  room.status === RoomStatus.Available 
                    ? 'badge-success' 
                    : 'badge-error'
                }`}>
                  {room.status}
                </div>
                {room.attachBathroom && (
                  <div className="badge badge-secondary">
                    <svg 
                      className="w-4 h-4 mr-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M21 12h-4M3 12h4m8-9v4M12 21v-4" 
                      />
                    </svg>
                    Attached Bathroom
                  </div>
                )}
              </div>
            </div>
  
            {/* Selection Indicator */}
            {isSelected ? (
              <div className="flex-shrink-0">
                <div className="badge badge-primary badge-lg">
                  <svg 
                    className="h-5 w-5" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  Selected
                </div>
              </div>
            ) : (
              <div className="flex-shrink-0 flex h-full">
                <div className="badge badge-primary badge-lg">
                  Select Room
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
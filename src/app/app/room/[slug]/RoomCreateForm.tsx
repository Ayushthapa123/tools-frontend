import TextInput from "src/features/react-hook-form/TextField";
import { RoomStatus } from "src/gql/graphql";
import ReactSelect from "src/features/react-hook-form/ReactSelect";
export const RoomCreateForm = ({ control, errors }: { control: any; errors: any }) => {
    const roomStatus = [
      { label: "Available", value: RoomStatus.Available },
      { label: "Idle", value: RoomStatus.Idle },
      // { label: "Inactive", value: RoomStatus.Inactive},
      { label: "Booked", value: RoomStatus.Booked }
  
    ];
  
    const roomCapacity = [
      { label: "One Bed", value: 'ONE_BED' },
      { label: "Two Bed", value: 'TWO_BED' }
    ];
  
    return (
      <div className="space-y-4">
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
          <ReactSelect
            name="status"
            placeholder="Status"
            options={roomStatus}
            defaultValue={roomStatus[0]}
            control={control}
            label="Status"
            error={!!errors.status}
          />
        </div>
        <div className="mb-3">
          <ReactSelect
            name="capacity"
            placeholder="Capacity"
            options={roomCapacity}
            defaultValue={roomCapacity[0]}
            control={control}
            label="Capacity"
            error={!!errors.capacity}
          />
        </div>
        <div className="mb-3">
          <TextInput
            name="maxOccupancy"
            placeholder="Max Occupancy"
            control={control}
            label="Max Occupancy"
            helpertext={errors.maxOccupancy?.type === 'required' ? 'Max Occupancy is Required' : ''}
            error={!!errors.maxOccupancy}
          />
        </div>
      </div>
    );
  };
  
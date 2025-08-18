import TextInput from 'src/features/react-hook-form/TextField';
import { RoomStatus } from 'src/gql/graphql';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextArea from 'src/features/react-hook-form/TextArea';
import { useFormState } from 'react-hook-form';
import { useEffect } from 'react';
export const RoomCreateForm = ({ control, errors, setIsStepOneDirty }: { control: any; errors: any; setIsStepOneDirty: (isDirty: boolean) => void }) => {
  const { isDirty ,dirtyFields} = useFormState({ control });
  useEffect(() => {
    setIsStepOneDirty(isDirty);
  }, [isDirty, dirtyFields]);
  const roomStatus = [
    { label: 'Available', value: RoomStatus.Available },
    { label: 'Idle', value: RoomStatus.Idle },
    { label: 'Inactive', value: RoomStatus.Inactive },
    { label: 'Booked', value: RoomStatus.Booked },
  ];

  const roomCapacity = [
    { label: 'One Bed', value: 'ONE_BED' },
    { label: 'Two Bed', value: 'TWO_BED' },
    { label: 'Three Bed', value: 'THREE_BED' },
    { label: 'Four Bed', value: 'FOUR_BED' },
    { label: 'Five Bed', value: 'FIVE_BED' },
    { label: 'Six Bed', value: 'SIX_BED' },
    { label: 'Seven Bed', value: 'SEVEN_BED' },
    { label: 'Eight Bed', value: 'EIGHT_BED' },
    { label: 'Many Beds', value: 'MULTI_BED' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="mb-2">
        <TextInput
          name="caption"
          type="text"
          placeholder="Room Caption"
          control={control}
          label="Room Caption"
          required
          helpertext={errors.caption?.type === 'required' ? 'Caption is Required' : ''}
          error={!!errors.caption}
        />
      </div>
      <div className="mb-2">
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

      <div className="mb-2">
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
      <div className="mb-2">
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
      <div className="mb-2">
        <TextArea
          name="description"
          placeholder="Description"
          control={control}
          label="Description"
          error={!!errors.description}
          rows={2}
        />
      </div>
      {/* <div className="mb-2">
        <TextInput
          type="number"
          min={0}
          name="maxOccupancy"
          placeholder="Max Occupancy"
          control={control}
          max={100}
          label="Max Occupancy"
          helpertext={errors.maxOccupancy?.type === 'required' ? 'Max Occupancy is Required' : ''}
          error={!!errors.maxOccupancy}
          datatype="number"
        />
      </div> */}
    </div>
  );
};

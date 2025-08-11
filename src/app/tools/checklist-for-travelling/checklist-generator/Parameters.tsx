"use client"
import React, { useMemo } from 'react'
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextInput from 'src/features/react-hook-form/TextField';
import { countries } from 'src/app/app/data/countries';
import { useFormContext } from 'react-hook-form';
import { TravelChecklistGeneratorInput } from 'src/gql/graphql';
export default function Parameters() {
  const { control, formState: { errors } } = useFormContext<TravelChecklistGeneratorInput>();

const travelTypeOptions = [
  { label: 'International Travel', value: 'international' },

  { label: 'National Travel', value: 'national' },

]

const travelCompanionTypeOptions = [
  { label: 'Solo Traveler', value: 'solo' },
      { label: 'Couple', value: 'couple' },
      { label: 'Family', value: 'family' },
      { label: 'Friends', value: 'friends' },
]

  return (
    < >
    <h3 className='text-lg font-bold mt-2 '>Parameters</h3>
    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4  '>

      <div className="">
        <TextInput
          name="travelDuration"
          type="number"
          placeholder="Number of Days"
          control={control}
          label="Number of Days"
          // required
          helpertext={errors?.travelDuration && 'travelDuration' in errors.travelDuration && (errors.travelDuration as any)?.type === 'required' ? 'Number of Days is required' : ''}
          error={!!(errors?.travelDuration && 'travelDuration' in errors.travelDuration && (errors.travelDuration as any))}
        />
      </div>
      <div>
        <ReactSelect
          name="travelType"
          placeholder="Travel Style"
          control={control}
          options={travelTypeOptions}
          label="Travel Style"
          required
          defaultValue={travelTypeOptions[0].value}
          helperText={
            errors?.travelType && 'travelType' in errors.travelType && (errors.travelType as any)?.type === 'required' ? 'Travel Style is required' : ''
          }
          error={!!(errors?.travelType && 'travelType' in errors.travelType && (errors.travelType as any))}
        />
      </div>
      <div>
        <ReactSelect
          name="travelCompanionType"
          placeholder="Travel Companion Type"
          control={control}
          options={travelCompanionTypeOptions}
          label="Travel Companion Type"
          required
          defaultValue={travelCompanionTypeOptions[0].value}
          helperText={
              errors?.travelCompanionType && 'travelCompanionType' in errors.travelCompanionType && (errors.travelCompanionType as any)?.type === 'required' ? 'Accomodation Type is required' : ''
          }
          error={!!(errors?.travelCompanionType && 'travelCompanionType' in errors.travelCompanionType && (errors.travelCompanionType as any))}
        />
      </div>
      <div className="">
        <TextInput
          name="purpose"
          type="text"
          placeholder="Explore, Relax, Adventure, etc."
          control={control}
          label="Purpose of the trip"
          required
          helpertext={errors?.purpose && 'purpose' in errors.purpose && (errors.purpose as any)?.type === 'required' ? 'Purpose is required' : ''}
          error={!!(errors?.purpose && 'purpose' in errors.purpose && (errors.purpose as any))}
        />
      </div>
      <div className="">
        <TextInput
          name="travelActivities"
          type="text"
          placeholder="Hiking, Swimming, Shopping, etc."
          control={control}
          label="Travel Activities"
          required
          helpertext={errors?.travelActivities && 'travelActivities' in errors.travelActivities && (errors.travelActivities as any)?.type === 'required' ? 'Travel Activities is required' : ''}
          error={!!(errors?.travelActivities && 'travelActivities' in errors.travelActivities && (errors.travelActivities as any))}
        />
      </div>

    <div>
 
   
   
    </div>
    </div>
    </>
  )
}

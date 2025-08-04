"use client"
import React, { useMemo } from 'react'
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextInput from 'src/features/react-hook-form/TextField';
import { countries } from 'src/app/app/data/countries';
import { useFormContext } from 'react-hook-form';

export default function Parameters() {
  const { control, formState: { errors } } = useFormContext();

const travelStyleOptions = [
  { label: 'Budget', value: 'budget' },
  { label: 'Mid-Range', value: 'mid-range' },
  { label: 'Luxury', value: 'luxury' },
]

const accomodationTypeOptions = [
  { label: 'Hostel', value: 'hostel' },

  { label: 'Hotel', value: 'hotel' },
  { label: 'Airbnb', value: 'airbnb' },
]

  return (
    < >
    <h3 className='text-lg font-bold mt-2 '>Parameters</h3>
    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4  '>
      <div>
        <ReactSelect
          name="travelStyle"
          placeholder="Travel Style"
          control={control}
          options={travelStyleOptions}
          label="Travel Style"
          required
          defaultValue={travelStyleOptions[0].value}
          helperText={
            errors?.travelStyle && 'travelStyle' in errors.travelStyle && (errors.travelStyle as any)?.type === 'required' ? 'Travel Style is required' : ''
          }
          error={!!(errors?.travelStyle && 'travelStyle' in errors.travelStyle && (errors.travelStyle as any))}
        />
      </div>
      <div>
        <ReactSelect
          name="accomodationType"
          placeholder="Accomodation Type"
          control={control}
          options={accomodationTypeOptions}
          label="Accomodation Type"
          required
          defaultValue={accomodationTypeOptions[0].value}
          helperText={
              errors?.accomodationType && 'accomodationType' in errors.accomodationType && (errors.accomodationType as any)?.type === 'required' ? 'Accomodation Type is required' : ''
          }
          error={!!(errors?.accomodationType && 'accomodationType' in errors.accomodationType && (errors.accomodationType as any))}
        />
      </div>
      <div className="">
        <TextInput
          name="purpose"
          type="text"
          placeholder="Purpose"
          control={control}
          label="Purpose of the trip"
          required
          helpertext={errors?.purpose && 'purpose' in errors.purpose && (errors.purpose as any)?.type === 'required' ? 'Purpose is required' : ''}
          error={!!(errors?.purpose && 'purpose' in errors.purpose && (errors.purpose as any))}
        />
      </div>
      <div className="">
        <TextInput
          name="numberOfDays"
          type="number"
          placeholder="Number of Days"
          control={control}
          label="Number of Days"
          // required
          helpertext={errors?.numberOfDays && 'numberOfDays' in errors.numberOfDays && (errors.numberOfDays as any)?.type === 'required' ? 'Number of Days is required' : ''}
          error={!!(errors?.numberOfDays && 'numberOfDays' in errors.numberOfDays && (errors.numberOfDays as any))}
        />
      </div>
    <div>
 
   
   
    </div>
    </div>
    </>
  )
}

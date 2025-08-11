"use client"
import React, { useMemo } from 'react'
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextInput from 'src/features/react-hook-form/TextField';
import { countries } from 'src/app/app/data/countries';
import { useFormContext } from 'react-hook-form';

export default function StartDestination() {
  const { control, formState: { errors } } = useFormContext();

  const countryOptions = useMemo(() => {
    return countries.map(country => ({
      label: country.name,
      value: country.name,
    }));
  }, []);

  return (
    <>
    <h3 className='text-lg font-bold'>Start Destination</h3>
    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
   
      <div>
        <ReactSelect
          name="startCountry"
          placeholder="Country"
          control={control}
          options={countryOptions}
          label="Country"
          height='sm'
          required
          helperText={
            errors?.startCountry && 'country' in errors.startCountry && (errors.startCountry.country as any)?.type === 'required' ? 'Country is required' : ''
          }
          error={!!(errors?.startCountry && 'country' in errors.startCountry && (errors.startCountry.country as any))}
        />
      </div>
      <div className="">
        <TextInput

          name="startCity"
          type="text"
          placeholder="City"
          control={control}
          label="City"
          required
          height='sm'
          helpertext={errors?.startCity && 'city' in errors.startCity && (errors.startCity.city as any)?.type === 'required' ? 'City is required' : ''}
          error={!!(errors?.startCity && 'city' in errors.startCity && (errors.startCity.city as any))} 
        />
      </div>
    </div>
    </>
  )
}

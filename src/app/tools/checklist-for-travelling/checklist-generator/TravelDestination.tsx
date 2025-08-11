"use client"
import React, { useMemo } from 'react'
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import TextInput from 'src/features/react-hook-form/TextField';
import { countries } from 'src/app/app/data/countries';
import { useFormContext } from 'react-hook-form';

export default function TravelDestination() {
  const { control, formState: { errors } } = useFormContext();

  const countryOptions = useMemo(() => {
    return countries.map(country => ({
      label: country.name,
      value: country.name,
    }));
  }, []);

  return (
    < >
    <h3 className='text-lg font-bold mt-2 '>Travel Destination</h3>
    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4  '>
      <div>
        <ReactSelect
          name="travelCountry"
          placeholder="Country"
          control={control}
          options={countryOptions}
          label="Country"
          required
          height='sm'
          helperText={
            errors?.travelCountry && 'country' in errors.travelCountry && (errors.travelCountry.country as any)?.type === 'required' ? 'Country is required' : ''
          }
          error={!!(errors?.travelCountry && 'country' in errors.travelCountry && (errors.travelCountry.country as any))}
        />
      </div>
      <div className="">
        <TextInput
          name="travelCity"
          type="text"
          placeholder="City"
          control={control}
          label="City"
          required
          height='sm'
          helpertext={errors?.travelCity && 'city' in errors.travelCity && (errors.travelCity.city as any)?.type === 'required' ? 'City is required' : ''}
          error={!!(errors?.travelCity && 'city' in errors.travelCity && (errors.travelCity.city as any))}
        />
      </div>
    </div>
    </>
  )
}

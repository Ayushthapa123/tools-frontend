'use client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import StartDestination from './StartDestination';
import Button from 'src/components/Button';
import Parameters from './Parameters';
import Result from './Result';
import {
  GetTravelDestination,
  GetTravelDestinationMutation,
  GetTravelDestinationMutationVariables,
 
  TdfData,
  TravelDestinationFinderInput,
} from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from 'src/components/Loading';
import { MdPrint, MdLocationOn, MdLocationPin, MdSettings, MdCalculate, MdTravelExplore } from 'react-icons/md';
import { GiTravelDress } from 'react-icons/gi';

export default function DestinationFinder() {
 
  const [personalizedTravelGuide, setPersonalizedTravelGuide] = useState('');
  const [detailedResults, setDetailedResults] = useState<TdfData[]>();

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  


  const methods = useForm<TravelDestinationFinderInput>({
    defaultValues: {
      startCountry: '',
      startCity: '',
      travelActivities: [],
      travelBudgetUSD: '',
      travelCompanionType: '',
      travelDuration: '',
      travelType: '',
      date: new Date(), // today's date
    },
    mode: 'onChange',
  });

  const mutateTravelDestination = useGraphqlClientRequest<
    GetTravelDestinationMutation,
    GetTravelDestinationMutationVariables
  >(GetTravelDestination.loc?.source.body!);

  const { mutateAsync, isPending } = useMutation({ mutationFn: mutateTravelDestination });

  const onSubmit = (data: TravelDestinationFinderInput) => {
    mutateAsync({
      input: {
        startCountry: data.startCountry,
        startCity: data.startCity,
        date: data.date,
        purpose: data.purpose,
        travelActivities: String(data.travelActivities).split(','),
        travelBudgetUSD: data.travelBudgetUSD,
        travelCompanionType: data.travelCompanionType,
        travelDuration: data.travelDuration,
        travelType: data.travelType,
      },
    }).then(res => {
     

      // for daily budget only include accomodation/food/transportation
      setPersonalizedTravelGuide(res?.getTravelDestination?.personalizedTravelGuide??"Some error occurred");
      setDetailedResults(res?.getTravelDestination?.data??[]);
    });
  };

  return (
    <FormProvider {...methods}>
      <div ref={contentRef} className="w-full mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <MdTravelExplore className="text-3xl " />
          </div>
        </div>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-lg p-4"
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-2 ">
                <MdLocationOn className="text-xl text-blue-600" />
                <h2 className="text-base font-semibold text-gray-800 relative mt-2">Starting Point</h2>
              </div>
              <StartDestination />
            </div>

           
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-2 ">
                <MdSettings className="text-xl text-blue-600" />
                <h2 className="text-base font-semibold text-gray-800 relative mt-2">Trip Details</h2>
              </div>
              <Parameters />
            </div>
          </div>

       

          <div className="mt-4">
            {isPending ? (
              <div className="flex h-20 items-center justify-center">
                <LoadingSpinner size='lg' />
              </div>
            ) : detailedResults && detailedResults.length > 0 ? (
              <div className="bg-gray-50 rounded-lg p-3">
                <Result
                
                  personalizedTravelGuide={personalizedTravelGuide}
                  detailedResults={detailedResults}
                />
              </div>
            ) : null}
          </div>
          <div className="w-full flex justify-between gap-5">
          <div className='w-full'>
            <Button
              type="submit"
              label="Find My Destination"
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-lg px-4 py-2 text-white font-medium shadow-md hover:shadow-lg"
            />
            </div>
            
            <div>
            <Button
              type='button'
              label="Print Results"
              onClick={reactToPrintFn}
              className="bg-gray-700 hover:bg-gray-800 transition-colors duration-300 rounded-lg px-3 py-2 text-white font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
              variant='secondary'
              startAdornment={<MdPrint className='text-lg' />}
            />
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

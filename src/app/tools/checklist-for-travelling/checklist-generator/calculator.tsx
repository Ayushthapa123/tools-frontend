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
  GetTravelChecklist,
  GetTravelChecklistMutation,
  GetTravelChecklistMutationVariables,

  TcgData,
 
  TravelChecklistGeneratorInput,
} from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from 'src/components/Loading';
import { MdPrint, MdLocationOn, MdSettings, MdTravelExplore, MdLocationPin, MdChecklist } from 'react-icons/md';
import TravelDestination from './TravelDestination';
export default function ChecklistGenerator() {
 
  const [personalizedTravelGuide, setPersonalizedTravelGuide] = useState('');
  const [detailedResults, setDetailedResults] = useState<TcgData[]>();

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  
  const methods = useForm<TravelChecklistGeneratorInput>({
    defaultValues: {
      startCountry: '',
      startCity: '',
      destinationCountry: '',
      destinationCity: '',
      travelActivities: [],
      travelCompanionType: '',
      travelDuration: '',
      travelType: '',
      purpose: '',
      date: new Date(), // today's date
    },
    mode: 'onChange',
  });

  const mutateTravelDestination = useGraphqlClientRequest<
    GetTravelChecklistMutation,
    GetTravelChecklistMutationVariables
  >(GetTravelChecklist.loc?.source.body!);

  const { mutateAsync, isPending } = useMutation({ mutationFn: mutateTravelDestination });

  const onSubmit = (data: TravelChecklistGeneratorInput) => {
    mutateAsync({
      input: {
        startCountry: data.startCountry,
        startCity: data.startCity,
        destinationCountry: data.destinationCountry,
        destinationCity: data.destinationCity,
        date: data.date,
        purpose: data.purpose,
        travelActivities: String(data.travelActivities).split(','),
        travelCompanionType: data.travelCompanionType,
        travelDuration: data.travelDuration,
        travelType: data.travelType,
      },
    }).then(res => {
     

      // for daily budget only include accomodation/food/transportation
      setPersonalizedTravelGuide(res?.getTravelChecklist?.personalizedTravelGuide??"Some error occurred");
      setDetailedResults(res?.getTravelChecklist?.data??[]);
    });
  };

  return (
    <FormProvider {...methods}>
      <div ref={contentRef} className="w-full mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <MdChecklist className="text-3xl " />
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

            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-2 ">
                <MdLocationPin className="text-xl text-blue-600" />
                <h2 className="text-base font-semibold text-gray-800 relative mt-2">Destination</h2>
              </div>
              <TravelDestination />
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
              label="Generate Checklist"
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

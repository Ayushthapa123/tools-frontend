'use client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import StartDestination from './StartDestination';
import TravelDestination from './TravelDestination';
import Button from 'src/components/Button';
import Parameters from './Parameters';
import Result from './Result';
import {
  GetTravelBudget,
  GetTravelBudgetMutation,
  GetTravelBudgetMutationVariables,
  TbcData,
  TbcList,
} from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from 'src/components/Loading';
import { MdPrint, MdLocationOn, MdLocationPin, MdSettings, MdCalculate } from 'react-icons/md';

export default function BudgetCalculator() {
  const [estimatedTotalBudget, setEstimatedTotalBudget] = useState(0);
  const [estimatedDailyBudget, setEstimatedDailyBudget] = useState(0);
  const [personalizedTravelGuide, setPersonalizedTravelGuide] = useState('');
  const [detailedResults, setDetailedResults] = useState<TbcData[]>();

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  


  const methods = useForm({
    defaultValues: {
      startCountry: '',
      startCity: '',
      travelCountry: '',
      travelCity: '',
      travelStyle: 'budget',
      accomodationType: 'hostel',
      numberOfDays: 3,
      purpose: '',
      date: new Date(), // today's date
    },
    mode: 'onChange',
  });

  const mutateTravelBudget = useGraphqlClientRequest<
    GetTravelBudgetMutation,
    GetTravelBudgetMutationVariables
  >(GetTravelBudget.loc?.source.body!);

  const { mutateAsync, isPending } = useMutation({ mutationFn: mutateTravelBudget });

  const onSubmit = (data: any) => {
    mutateAsync({
      input: {
        startCountry: data.startCountry,
        startCity: data.startCity,
        travelCountry: data.travelCountry,
        travelCity: data.travelCity,
        accomodationType: data.accomodationType,
        date: data.date,
        numberOfDays: Number(data.numberOfDays),
        purpose: data.purpose,
        travelStyle: data.travelStyle,
      },
    }).then(res => {
      const estimatedTotalBudget = res?.getTravelBudget?.data?.reduce((acc, curr) => acc + curr.cost, 0);
      setEstimatedTotalBudget(estimatedTotalBudget ?? 0); 

      // for daily budget only include accomodation/food/transportation
      const dailyBudget = res.getTravelBudget?.data?.filter(item => item.category === 'Accommodation' || item.category === 'Food' || item.category === 'Local Transport In city');
      setEstimatedDailyBudget(dailyBudget?.reduce((acc, curr) => acc + curr.cost, 0) ?? 0);
      setPersonalizedTravelGuide(res?.getTravelBudget?.personalizedTravelGuide??"Some error occurred");
      setDetailedResults(res?.getTravelBudget?.data??[]);
    });
  };

  return (
    <FormProvider {...methods}>
      <div ref={contentRef} className="w-full mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <MdCalculate className="text-3xl " />
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

          <div className="w-full flex justify-between gap-5">
          <div className='w-full'>
            <Button
              type="submit"
              label="Calculate Budget"
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-lg px-4 py-2 text-white font-medium shadow-md hover:shadow-lg"
            />
            </div>
            
            <div>
            <Button
              label="Print Budget"
              onClick={reactToPrintFn}
              className="bg-gray-700 hover:bg-gray-800 transition-colors duration-300 rounded-lg px-3 py-2 text-white font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
              variant='secondary'
              startAdornment={<MdPrint className='text-lg' />}
            />
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
                  estimatedTotalBudget={estimatedTotalBudget}
                  estimatedDailyBudget={estimatedDailyBudget}
                  personalizedTravelGuide={personalizedTravelGuide}
                  detailedResults={detailedResults}
                />
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

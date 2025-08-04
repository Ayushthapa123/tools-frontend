'use client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
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
export default function BudgetCalculator() {
  const [estimatedTotalBudget, setEstimatedTotalBudget] = useState(0);
  const [estimatedDailyBudget, setEstimatedDailyBudget] = useState(0);
  const [personalizedTravelGuide, setPersonalizedTravelGuide] = useState('');
  const [detailedResults, setDetailedResults] = useState<TbcData[]>();
  const methods = useForm({
    defaultValues: {
      startCountry: '',
      startCity: '',
      travelCountry: '',
      travelCity: '',
      travelStyle: 'budget',
      accomodationType: 'hostel',
      numberOfDays: 1,
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
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="border-red-500 w-full border-2 p-3 lg:p-5">
        <div>
          <StartDestination />
        </div>
        <div>
          <TravelDestination />
        </div>
        <div>
          <Parameters />
        </div>
        <Button
          type="submit"
          label="Calculate"
          className="bg-blue-500 mt-4 rounded px-4 py-2 text-white"
        />
        <div className="mt-4">
          {isPending ? (
            <div className="flex h-32 items-center justify-center">
              <div className="">
                <LoadingSpinner size='lg' />
              </div>
            </div>
          ) : (
            <Result
              estimatedTotalBudget={estimatedTotalBudget}
              estimatedDailyBudget={estimatedDailyBudget}
              personalizedTravelGuide={personalizedTravelGuide}
              detailedResults={detailedResults ?? []}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
}

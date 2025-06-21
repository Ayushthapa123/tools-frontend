import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  GetOnboardingData,
  GetOnboardingDataQuery,
  GetOnboardingDataQueryVariables,
  CompleteOnboardingMutation,
  CompleteOnboardingMutationVariables,
  CompleteOnboarding,
} from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaHome, FaPhone, FaImages, FaDoorOpen, FaConciergeBell } from 'react-icons/fa';
import IconButton from 'src/components/IconButton';
import Link from 'next/link';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';
import { enqueueSnackbar } from 'notistack';

export default function OnboardingCompletion() {
  const router = useRouter();
  const { data: onboardingData, isLoading } = useGraphQLQuery<
    GetOnboardingDataQuery,
    GetOnboardingDataQueryVariables
  >({
    queryKey: [ 'getOnboardingData' ],
    query: GetOnboardingData.loc!.source.body,
    variables: {},
    enabled: true,
  });

  const mutateCompleteOnboarding = useGraphqlClientRequest<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>(CompleteOnboarding.loc!.source.body!);

  useEffect(() => {
    if (!isLoading && !onboardingData?.getOnboardingData?.data) {
      router.push('/app');
    }
  }, [ isLoading, onboardingData, router ]);

  const calculateProgress = () => {
    if (!onboardingData?.getOnboardingData?.data) return 0;

    const data = onboardingData.getOnboardingData.data;
    let completedSteps = 0;
    const totalSteps = 5;

    if (data.address?.id) completedSteps++;
    if (data.contact?.id) completedSteps++;
    if (data.gallery?.length > 0) completedSteps++;
    if (data.rooms?.length > 0) completedSteps++;
    if (data.amenities?.id) completedSteps++;

    return (completedSteps / totalSteps) * 100;
  };

  const progress = calculateProgress();
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-lg font-medium">Loading your progress...</p>
        </div>
      </div>
    );
  }

  const handleOnboardingRedirect = () => {
    if (!onboardingData?.getOnboardingData?.data?.contact?.id) {

      return router.push('/app/hostel-info');
    }
    if (!onboardingData?.getOnboardingData?.data?.address?.id) {
      return router.push('/app/hostel-info');
    }
    if (!(onboardingData?.getOnboardingData?.data?.gallery && onboardingData.getOnboardingData.data.gallery.length > 0)) {
      return router.push('/app/gallery');
    }
    if (!(onboardingData?.getOnboardingData?.data?.rooms && onboardingData.getOnboardingData.data.rooms.length > 0)) {
      router.push('/app/room');
    }
    if (!onboardingData?.getOnboardingData?.data?.amenities?.id) {

      return router.push('/app/amenities');
    }
    if (progress == 100) {
      // router.push('/app/hostel-profile');
      // call the api to complete the onboarding
      mutateCompleteOnboarding().then((res) => {
        if (res?.completeOnboarding?.error) {
          enqueueSnackbar(res.completeOnboarding.error.message, { variant: 'error' });
        }
        if (res?.completeOnboarding?.data?.id) {
          enqueueSnackbar('Onboarding completed successfully', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: [ 'getHostelDetailsBasic' ] });
        }
      });
    }
  };

  const handleStepClick = (step: string) => {
    if (step === 'address') {
      router.push('/app/hostel-info');
    }

    if (step === 'gallery') {
      router.push('/app/gallery');
    }
    if (step === 'room') {
      router.push('/app/room');
    }
    if (step === 'amenities') {
      router.push('/app/amenities');
    }
  };

  return (
    <div className="  w-full">
      <div className=" px-4">
        <div className="w-full">
          <span className="text-sm sm:text-base font-medium text-error">Please Complete your digital profile to get listed on <Link href="https://hostelpilot.com" target='_blank' className='text-blue'> Hostelpilot</Link></span>
          <div className="mb-8 flex flex-row-reverse items-start justify-between gap-4 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green">{Math.round(progress)}%</span>
            </div>
            <div className="w-full pt-1">
              <div className="overflow-hidden h-4 text-xs flex rounded bg-base-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-1">
            <StepItem
              icon={FaHome}
              title="Address & Contact Information"
              isCompleted={!!onboardingData?.getOnboardingData?.data?.address?.id && !!onboardingData?.getOnboardingData?.data?.contact?.id}
              handleClick={() => handleStepClick('address')}
            />

            <StepItem
              icon={FaImages}
              title="Gallery Images"
              isCompleted={!!(onboardingData?.getOnboardingData?.data?.gallery && onboardingData.getOnboardingData.data.gallery.length > 0)}
              handleClick={() => handleStepClick('gallery')}
            />
            <StepItem
              icon={FaDoorOpen}
              title="Room Information"
              isCompleted={!!(onboardingData?.getOnboardingData?.data?.rooms && onboardingData.getOnboardingData.data.rooms.length > 0)}
              handleClick={() => handleStepClick('room')}
            />
            <StepItem
              icon={FaConciergeBell}
              title="Amenities"
              isCompleted={!!onboardingData?.getOnboardingData?.data?.amenities?.id}
              handleClick={() => handleStepClick('amenities')}
            />
          </div>

          <div className="card-actions justify-end mt-8">
            <button
              className="btn btn-primary btn-md gap-2 text-sm w-full sm:w-fit sm:text-base"
              onClick={handleOnboardingRedirect}
            >
              {progress == 100 ? 'Complete Hostel Profile' : 'Complete Hostel Profile'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


const StepItem = ({
  icon: Icon,
  title,
  isCompleted,
  handleClick
}: {
  icon: React.ElementType;
  title: string;
  isCompleted: boolean,
  handleClick: () => void
}) => (
  <div className="flex flex-col sm:flex-row items-start sm:justify-between w-full gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
    onClick={handleClick}
  >
    <div className='flex items-start gap-2'>
      <IconButton className="flex-shrink-0">
        <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${isCompleted ? 'text-success' : 'text-error'}`} />
      </IconButton>
      <div className="flex-1 min-w-0">
        <h3 className=" text-base sm:text-xl mb-0 font-semibold">{title}</h3>
        <p className="text-sm sm:text-sm text-gray-400">
          {isCompleted ? 'Successfully completed' : 'Needs attention'}
        </p>
      </div>
    </div>
    {isCompleted ? (
      <span className="badge badge-success badge-sm w-full sm:w-fit sm:min-w-[120px] sm:badge-md gap-0 sm:gap-1 flex-shrink-0 p-4 !px-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span className="inline font-semibold">Completed</span>
      </span>
    ) : (
      <span className="badge badge-error badge-sm sm:badge-md w-full sm:w-fit gap-1 sm:gap-1 flex-shrink-0 p-4 sm:min-w-[120px] !px-2">
        <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1a11 11 0 1 0 11 11A11.012 11.012 0 0 0 12 1Zm1 11a1 1 0 0 1-1 1H7a1 1 0 0 1 0-2h4V6a1 1 0 0 1 2 0Z" />
        </svg>
        <span className="inline font-semibold text-white">Pending</span>
      </span>
    )}
  </div>
);
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  GetOnboardingData,
  GetOnboardingDataQuery,
  GetOnboardingDataQueryVariables,
} from 'src/gql/graphql';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';
import { FaHome, FaPhone, FaImages, FaDoorOpen, FaConciergeBell } from 'react-icons/fa';
import IconButton from 'src/components/IconButton';
import Link from 'next/link';

export default function OnboardingCompletion() {
  const router = useRouter();
  const { data: onboardingData, isLoading } = useGraphQLQuery<
    GetOnboardingDataQuery,
    GetOnboardingDataQueryVariables
  >({
    queryKey: ['getOnboardingData'],
    query: GetOnboardingData.loc!.source.body,
    variables: {},
    enabled: true,
  });

  useEffect(() => {
    if (!isLoading && !onboardingData?.getOnboardingData?.data) {
      router.push('/app/onboarding');
    }
  }, [isLoading, onboardingData, router]);

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
    if(!onboardingData?.getOnboardingData?.data?.contact?.id){
      router.push('/app/hostel-info');
    }
    if(!onboardingData?.getOnboardingData?.data?.address?.id){
      router.push('/app/hostel-info');
    }
    if(!(onboardingData?.getOnboardingData?.data?.gallery && onboardingData.getOnboardingData.data.gallery.length > 0)){
      router.push('/app/gallery');
    }
    if(!(onboardingData?.getOnboardingData?.data?.rooms && onboardingData.getOnboardingData.data.rooms.length > 0)){
      router.push('/app/room');
    }
    if(!onboardingData?.getOnboardingData?.data?.amenities?.id){
      router.push('/app/amenities');
    }
  };

  const handleStepClick = (step: string) => {
    if(step === 'address'){
      router.push('/app/hostel-info');
    }

    if(step === 'gallery'){
      router.push('/app/gallery');
    }
    if(step === 'room'){
      router.push('/app/room');
    }
    if(step === 'amenities'){
      router.push('/app/amenities');
    }
  };

  return (
    <div className="  w-full">
      <div className=" px-4">
        <div className="w-full">
   
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-medium text-error">Please Complete your digital profile to get listed on <Link href="https://hostelpilot.com" target='_blank' className='text-primary'> Hostelpilot</Link></span>
                  <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-4 text-xs flex rounded bg-base-200">
                    <div
                      style={{ width: `${progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <StepItem
                  icon={FaHome}
                  title="Address & Contact Information"
                  isCompleted={!!onboardingData?.getOnboardingData?.data?.address?.id} 
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
                  className="btn btn-primary btn-md gap-2"
                  onClick={handleOnboardingRedirect}
                >
                  {progress === 100 ? 'Review Profile' : 'Complete Hostel Profile'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
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
    isCompleted: boolean ,
    handleClick: () => void
  }) => (
    <div className="flex items-center w-full gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors cursor-pointer" 
    onClick={handleClick}
    >
      <IconButton className="flex-shrink-0">
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isCompleted ? 'text-success' : 'text-error'}`} />
      </IconButton>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm sm:text-base truncate">{title}</h3>
        <p className="text-xs sm:text-sm opacity-70 truncate">
          {isCompleted ? 'Successfully completed' : 'Needs attention'}
        </p>
      </div>
      {isCompleted ? (
        <span className="badge badge-success badge-sm sm:badge-md gap-1 sm:gap-2 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">Completed</span>
        </span>
      ) : (
        <span className="badge badge-error badge-sm sm:badge-md gap-1 sm:gap-2 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">Pending</span>
        </span>
      )}
    </div>
  );
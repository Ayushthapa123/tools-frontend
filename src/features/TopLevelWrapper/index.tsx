'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useSession } from 'next-auth/react';

import { ReactNode } from 'react';
import { CheckSession } from '../CheckSession';
// import SpinLoading from './Loading/SpinLoading';

export const TopLevelWrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  // const { data } = useSession();
  return (
    <div className=' bg-white'>
      <QueryClientProvider client={queryClient}>
        
      <CheckSession />
        
        {children}</QueryClientProvider>
    </div>
  );
};

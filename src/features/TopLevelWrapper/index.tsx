'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useSession } from 'next-auth/react';
import { closeSnackbar, SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';
import { CheckSession } from '../CheckSession';
// import SpinLoading from './Loading/SpinLoading';

import { MaterialDesignContent } from 'notistack';
import styled from '@emotion/styled';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: '#395B55',
  },
}));

export const TopLevelWrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  // const { data } = useSession();
  return (
    <div className=" bg-white">
      <QueryClientProvider client={queryClient}>
        <CheckSession />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
          Components={{
            success: StyledMaterialDesignContent,
          }}
          action={snackbarId => <button onClick={() => closeSnackbar(snackbarId)}>❌</button>}
        >
          {children}
        </SnackbarProvider>
      </QueryClientProvider>
    </div>
  );
};

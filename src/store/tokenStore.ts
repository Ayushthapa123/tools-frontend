import { create } from 'zustand';

import { persist } from 'zustand/middleware';
type Store = {
  accessToken: string;
};

type Actions = {
  setAccessToken: (token: string) => void;
};

export const useOrgIDStore = create<Store & Actions>()(
  persist(
    set => ({
      accessToken: '',
      setAccessToken: (token: string) => set({ accessToken:token }),
    }),
    {
      name: 'id-store',
    }
  ),
);

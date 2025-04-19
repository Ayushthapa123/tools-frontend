import { create } from 'zustand';

type Store = {
  accessToken: string;
};

type Actions = {
  setAccessToken: (token: string) => void;
};

export const useAccessTokenStore = create<Store & Actions>()(set => ({
  accessToken: '',
  setAccessToken: (token: string) => set({ accessToken: token }),
}));

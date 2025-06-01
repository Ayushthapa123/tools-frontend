import { create } from 'zustand';

type Store = {
  email: string;
};

type Actions = {
  setEmail: (token: string) => void;
};

export const useEmailStore = create<Store & Actions>()(set => ({
  email: '',
  setEmail: (email: string) => set({ email: email }),
}));

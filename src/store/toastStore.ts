import { create } from 'zustand';

type Store = {
  showToast: boolean;
  message: string;
  role: 'alert' | 'success' | 'error' | '';
};

type Actions = {
  setShowToast: (show: boolean) => void;
  setMessage: (message: string) => void;
  setRole: (message: 'alert' | 'success' | 'error') => void;
};

export const useToastStore = create<Store & Actions>()(set => ({
  message: '',
  showToast: false,
  role: '',
  setRole: (role: 'alert' | 'success' | 'error' | '') => set({ role }),
  setMessage: (message: string) => set({ message }),

  setShowToast: (show: boolean) => set({ showToast: show }),
}));

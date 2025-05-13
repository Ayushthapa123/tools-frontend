import { create } from 'zustand';
type user = {
  userId: number | null;
  homestayId: number | null;
  userName: string;
  userEmail: string;
  userType: string;
};

type Store = {
  user: user;
};

type Actions = {
  setUser: (user: user) => void;
};

export const useUserStore = create<Store & Actions>()(set => ({
  user: {
    userId: null,
    homestayId: null,
    userName: '',
    userEmail: '',
    userType: '',
  },

  setUser: (user: user) => set({ user }),
}));

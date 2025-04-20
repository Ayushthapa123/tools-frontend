import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  roomId: string;
};

type Actions = {
  setRoomId: (roomId: string) => void;
};

export const useRoomStore = create<Store & Actions>()(
  persist(
    (set) => ({
      roomId: '',
      setRoomId: (roomId: string) => set({ roomId: roomId }),
    }),
    {
      name: 'room-storage', // unique name for the storage
    }
  )
);

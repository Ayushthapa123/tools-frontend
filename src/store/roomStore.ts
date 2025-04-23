import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  roomIds: string[];
};

type Actions = {
  setRoomIds: (roomIds: string[]) => void;
};

export const useRoomStore = create<Store & Actions>()(
  persist(
    (set) => ({
      roomIds: [],
      setRoomIds: (roomIds: string[]) => set({ roomIds: [...new Set(roomIds)] }),
    }),
    {
      name: 'room-storage', // unique name for the storage
    }
  )
);

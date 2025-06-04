// store/useTripStore.ts
import { TripProps } from '@/app/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zustandAsyncStorage } from '@/lib/asyncStorageAdapter';

type TripState = TripProps & {
  setTrip: (data: TripProps) => void;
};

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      line: null,
      origin: null,
      destination: null,
      setTrip: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'trip-storage', // unique key
      storage: zustandAsyncStorage,
    }
  )
);
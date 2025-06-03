// store/useTripStore.ts
import { TripProps } from '@/app/types';
import { create } from 'zustand';

export const useTripStore = create((set) => ({
  line: null,
  origin: null,
  destination: null,
  setTrip: (data:TripProps) => set(data),
}));

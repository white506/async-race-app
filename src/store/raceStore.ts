import { create } from 'zustand';

interface RaceState {
  isRaceInProgress: boolean;
  paginationState: { currentPage: number };
  formState: { name: string; color: string };
  startRace: () => void;
  stopRace: () => void;
  setPaginationState: (state: { currentPage: number }) => void;
  setFormState: (state: { name: string; color: string }) => void;
}

const useRaceStore = create<RaceState>((set) => ({
  isRaceInProgress: false,
  paginationState: { currentPage: 1 },
  formState: { name: '', color: '#000000' },
  startRace: () => set({ isRaceInProgress: true }),
  stopRace: () => set({ isRaceInProgress: false }),
  setPaginationState: (state) => set({ paginationState: state }),
  setFormState: (state) => set({ formState: state }),
}));

export default useRaceStore;
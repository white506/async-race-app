import { create } from 'zustand';

interface RaceState {
  isRaceInProgress: boolean;
  startRace: () => void;
  stopRace: () => void;
}

const useRaceStore = create<RaceState>((set) => ({
  isRaceInProgress: false,
  startRace: () => set({ isRaceInProgress: true }),
  stopRace: () => set({ isRaceInProgress: false }),
}));

export default useRaceStore;
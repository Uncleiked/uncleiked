import { create } from 'zustand';

interface AppState {
  completion: number;
  hasContacted: boolean;
  setCompletion: (val: number) => void;
  markContacted: () => void;
}

export const useStore = create<AppState>((set) => ({
  completion: 0,
  hasContacted: false,
  setCompletion: (val) => set({ completion: val }),
  markContacted: () => set({ hasContacted: true, completion: 100 }),
}));
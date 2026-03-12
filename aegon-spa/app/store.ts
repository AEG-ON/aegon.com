import { create } from 'zustand';

interface AppState {
  theme: 'black' | 'blue';
  toggleTheme: () => void;
  setTheme: (theme: 'black' | 'blue') => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isVideoPlaying: boolean;
  setIsVideoPlaying: (playing: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'black',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'black' ? 'blue' : 'black' })),
  setTheme: (theme) => set({ theme }),
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
  isVideoPlaying: true,
  setIsVideoPlaying: (playing) => set({ isVideoPlaying: playing }),
}));

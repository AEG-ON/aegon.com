import { create } from 'zustand';

interface AppState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isVideoPlaying: boolean;
  setIsVideoPlaying: (playing: boolean) => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  isPortfolioInteractive: boolean;
  setPortfolioInteractive: (interactive: boolean) => void;
  focusPlanet: string | null;
  setFocusPlanet: (planetId: string | null) => void;
  currentProjectIndex: number;
  setCurrentProjectIndex: (index: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setTheme: (theme) => set({ theme }),
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
  isVideoPlaying: true,
  setIsVideoPlaying: (playing) => set({ isVideoPlaying: playing }),
  isSoundEnabled: false,
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  isPortfolioInteractive: false,
  setPortfolioInteractive: (interactive) => set({ isPortfolioInteractive: interactive }),
  focusPlanet: null,
  setFocusPlanet: (planetId) => set({ focusPlanet: planetId }),
  currentProjectIndex: 0,
  setCurrentProjectIndex: (index) => set({ currentProjectIndex: index }),
}));

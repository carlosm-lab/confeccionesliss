import { create } from "zustand";

interface AppState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  // Añade más estados globales aquí
}

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

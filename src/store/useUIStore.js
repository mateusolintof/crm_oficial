import { create } from 'zustand';

export const useUIStore = create((set) => ({
    isSidebarOpen: true,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    isCommandPaletteOpen: false,
    setCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),
    toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),

    activeModal: null, // 'create-lead', 'settings', etc.
    openModal: (modalName) => set({ activeModal: modalName }),
    closeModal: () => set({ activeModal: null }),
}));

import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: {
        id: '1',
        name: 'Mateus Olinto',
        email: 'mateus@alma.agency',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Mateus+Olinto&background=0284c7&color=fff',
    },
    isAuthenticated: true,
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
}));

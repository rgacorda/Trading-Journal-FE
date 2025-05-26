import { create } from "zustand";
import { persist } from 'zustand/middleware';

type User = {
  firstname: string;
  middlename: string|null;
  lastname: string;
//   role: string;
  email: string;
  phone: string;
  avatar: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-store', 
    }
  )
);


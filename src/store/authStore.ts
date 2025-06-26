import { create } from "zustand";
import { persist } from "zustand/middleware";
import { zustandMMKVStorage } from "../lib/mmkvStorage";
import { UserState } from "../types/auth";

export const useAuthStore = create(
  persist<UserState>(
    (set) => ({
      isLoggedIn: false,
      token: null,
      role: null,
      id: null,

      setToken: (token) => set({ token }),
      setRole: (role) => set({ role }),
      setId: (id) => set({ id }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

      reset: () =>
        set({
          isLoggedIn: false,
          token: null,
          role: null,
          id: null,
        }),
    }),
    {
      name: "auth-store",
      storage: zustandMMKVStorage as any,
    }
  )
);

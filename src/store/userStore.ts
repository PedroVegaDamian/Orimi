import { UserPrimaryData } from '@/models/user'
import { create } from 'zustand'

interface UserStore {
  isLoading: boolean
  user: UserPrimaryData | null
  setLoading: (isLoading: boolean) => void
  setUser: (user: UserPrimaryData | null) => void
}

export const useUserStore = create<UserStore>(set => ({
  user: null,
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setUser: (user: UserPrimaryData | null) => set({ user })
}))

import { create } from 'zustand'

export const useStore = create(set => ({
  bears: 100,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}))

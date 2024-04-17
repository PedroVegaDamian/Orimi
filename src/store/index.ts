import { create } from 'zustand'
interface State {
  bears: number
}

export const useStore = create<State>(set => ({
  bears: 100,
  increasePopulation: () => set((state: State) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}))

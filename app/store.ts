import { create } from 'zustand'

interface TriggerState {
  triggerUseEffect: number
  change: () => void
  removeAll: () => void
}

export const useTriggerUseEffect = create<TriggerState>()((set) => ({
  triggerUseEffect: 0,
  change: () => set((state) => ({ triggerUseEffect: state.triggerUseEffect + 1 })),
  removeAll: () => set({ triggerUseEffect: 0 }),
}))
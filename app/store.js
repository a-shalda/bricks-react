import { create } from 'zustand'

export const useTriggerUseEffect = create((set) => ({
  triggerUseEffect: 0,
  change: () => set((state) => ({ triggerUseEffect: state.triggerUseEffect + 1 })),
  removeAll: () => set({ triggerUseEffect: 0 }),
}))

function TriggerUseEffectCounter() {
  const counter = useTriggerUseEffect((state) => state.triggerUseEffect)
  return <h1>{counter}</h1>
}

function TriggerUseEffectControls() {
  const change = useTriggerUseEffect((state) => state.change)
  return <button onClick={change}>one up</button>
}

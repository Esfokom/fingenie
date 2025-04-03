import { create } from "zustand"

type ModelType = "fingenie" | "bankora"

interface ModelState {
  activeModel: ModelType
  setActiveModel: (model: ModelType) => void
}

export const useModelStore = create<ModelState>((set) => ({
  activeModel: "fingenie",
  setActiveModel: (model) => set({ activeModel: model }),
}))


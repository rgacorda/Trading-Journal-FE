import { create } from "zustand";

type TradeUIState = {
  editOpen: boolean;
  deleteOpen: boolean;
  selectedTradeId: string | null;
  setEditOpen: (open: boolean) => void;
  setDeleteOpen: (open: boolean) => void;
  setSelectedTradeId: (id: string | null) => void;
};

export const useTradeUIStore = create<TradeUIState>((set) => ({
  editOpen: false,
  deleteOpen: false,
  selectedTradeId: null,
  setEditOpen: (open) => set({ editOpen: open }),
  setDeleteOpen: (open) => set({ deleteOpen: open }),
  setSelectedTradeId: (id) => set({ selectedTradeId: id }),
}));

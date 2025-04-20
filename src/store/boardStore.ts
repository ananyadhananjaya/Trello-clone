// src/stores/boardsStore.ts
import { create } from "zustand";
import { supabase } from "@/supabaseClient";

export interface Board {
  id: string;
  name: string;
  description?: string;
  created_by: string;
  created_at: string;
}

interface BoardsState {
  boards: Board[];
  fetchBoards: () => Promise<void>;
}

export const useBoardsStore = create<BoardsState>((set) => ({
  boards: [],
  fetchBoards: async () => {
    const { data, error } = await supabase.from("boards").select("*");
    if (error) {
      console.error("Error fetching boards:", error.message);
      return;
    }
    set({ boards: data || [] });
  },
}));

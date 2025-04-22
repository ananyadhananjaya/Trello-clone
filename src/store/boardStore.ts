// src/stores/boardsStore.ts
import { create } from "zustand";
import { supabase } from "@/supabaseClient";

export interface Board {
  id: number;
  name: string;
  description?: string;
  created_by: string;
  created_at: string;
}

export interface Tasks {
  id: string;
  title: string;
  order_index: number;
  description?: string;
  created_by: string;
  created_on: string;
  due_date: string;
  flags: string[];
  board_id: number;
}

interface BoardsState {
  boards: Board[];
  fetchBoards: () => Promise<void>;
  tasks: Tasks[];
  fetchTasks : () => Promise<void>;
  setTasks: (tasks: any) => Promise<void>;
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
  tasks: [],
  fetchTasks: async () => {
    const { data, error } = await supabase.from("task_cards").select("*");
    if (error) {
      console.error("Error fetching boards:", error.message);
      return;
    }
    set({ tasks: data || [] });
  },
  setTasks: async () => {

  }
}));

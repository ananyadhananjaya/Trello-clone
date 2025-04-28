// src/stores/boardsStore.ts
import { create } from "zustand";
import { supabase } from "@/supabaseClient";
import { fetchTasks } from "@/pages/boards";

export interface Board {
  id: number;
  name: string;
  description?: string;
  created_by: string;
  created_at: string;
}

export interface Tasks {
  id: number;
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
  setTasks: (taskId:number, board_id: number) => Promise<void>;
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
  setTasks: async (taskId:number, board_id: number) => {
    const { data, error } = await supabase
    .from("task_cards")
    .update({ board_id: board_id })
    .eq("id", taskId)

    console.log("put", data, error)

    fetchTasks();
    
  }
}));

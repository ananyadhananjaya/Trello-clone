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
  id: number;
  title: string;
  order_index: number;
  description?: string;
  created_by: string;
  created_on: string;
  due_date: string;
  flags: string[];
  board_id: number;
  entered_board_on: string;
}

interface BoardsState {
  boards: Board[];
  fetchBoards: () => Promise<void>;
  tasks: Tasks[];
  fetchTasks: () => Promise<void>;
  setTasks: (taskId: number, board_id: number) => Promise<void>;
  updateTask: (task: Tasks) => Promise<void>;
  updateBoards: (
    boardId: number,
    name: string,
    description: string
  ) => Promise<void>;
}

export const fetchBoardsToStore = async () => {
  await useBoardsStore.getState().fetchBoards();
};

export const fetchTasksToStore = async () => {
  await useBoardsStore.getState().fetchTasks();
};

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
  setTasks: async (taskId: number, board_id: number) => {
    const { data, error } = await supabase
      .from("task_cards")
      .update({ board_id: board_id })
      .eq("id", taskId);

    fetchTasksToStore();
  },
  updateBoards: async (boardId: number, name: string, description: string) => {
    const { data, error } = await supabase
      .from("boards")
      .update({ name, description })
      .eq("id", boardId);

    if (error) {
      console.error("Error updating board:", error.message);
      return;
    }

    fetchBoardsToStore();
  },
  updateTask: async (task: Tasks) => {
    const { data, error } = await supabase
      .from("task_cards")
      .update({
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        flags: task.flags,
        board_id: task.board_id,
      })
      .eq("id", task.id);

    if (error) {
      console.error("Error updating task:", error.message);
      return;
    }

    fetchTasksToStore();
  },
}));

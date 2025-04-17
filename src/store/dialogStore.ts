import { create } from "zustand";

type DialogType = 
  | "CREATE_TASK"
  | "EDIT_TASK"
  | "CONFIRM_DELETE"
  | "CREATE_BOARD"
  | null

interface DialogState {
  openDialog: DialogType;
  dialogData: any;
  setDialog: (dialog: DialogType, data?: any) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  openDialog: null,
  dialogData: null,
  setDialog: (openDialog, dialogData = null) => set({ openDialog, dialogData }),
  closeDialog: () => set({ openDialog: null, dialogData: null }),
}));

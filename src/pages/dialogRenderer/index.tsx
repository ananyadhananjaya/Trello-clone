import { useDialogStore } from "@/store/dialogStore";
import CreateBoardDialog from "./createBoard";
import CreateTaskDialog from "./createTaskCard";
import EditBoard from "./editBoard";


export function DialogRenderer() {
  const { openDialog, closeDialog, dialogData } = useDialogStore();

  if (!openDialog) return null;

  switch (openDialog) {
    
    case "CREATE_BOARD":
      return <CreateBoardDialog open onClose={closeDialog} data={dialogData} />;
    case "CREATE_TASK":
      return <CreateTaskDialog open onClose={closeDialog}   />

    case "EDIT_BOARD":
      return <EditBoard open onClose={closeDialog} data={dialogData} />;

    default:
      return null;
  }
}

import { useDialogStore } from "@/store/dialogStore";
import CreateBoardDialog from "./createBoard";
import CreateTaskDialog from "./createTaskCard";


export function DialogRenderer() {
  const { openDialog, closeDialog, dialogData } = useDialogStore();

  if (!openDialog) return null;
 console.log(openDialog)
  switch (openDialog) {
    
    case "CREATE_BOARD":
      return <CreateBoardDialog open onClose={closeDialog} data={dialogData} />;
    case "CREATE_TASK":
      return <CreateTaskDialog open onClose={closeDialog}   />

    default:
      return null;
  }
}

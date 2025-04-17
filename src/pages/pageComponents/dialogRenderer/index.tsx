import { useDialogStore } from "@/store/dialogStore";
import CreateBoardDialog from "./createBoard";


export function DialogRenderer() {
  const { openDialog, closeDialog, dialogData } = useDialogStore();

  if (!openDialog) return null;
 
  switch (openDialog) {
    case "CREATE_BOARD":
      return <CreateBoardDialog open onClose={closeDialog} data={dialogData} />;

    default:
      return null;
  }
}

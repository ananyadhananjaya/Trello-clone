import { Flex } from "@chakra-ui/react";
import { ChevronDown, Ellipsis } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { useEffect, useState } from "react";
import BoardColumn from "../pageComponents/boardColumn";
import { useDialogStore } from "@/store/dialogStore";
import { fetchBoardsToStore, fetchTasksToStore } from "@/store/boardStore";


const Boards = () => {
  const [selectBoards, setSelectBoards] = useState<string>("select ..");
  const { setDialog } = useDialogStore();

  useEffect(() => {
    fetchBoardsToStore();
    fetchTasksToStore();
  }, []);

  const handleSelect = (e: string) => {
    switch (e) {
      case "createBoard":
        setDialog("CREATE_BOARD");
        setSelectBoards(e);
        break;
      case "createTask":
        setDialog("CREATE_TASK");
        setSelectBoards(e);
        break;
      case "editBoard":
        setDialog("EDIT_BOARD");
        setSelectBoards(e);
        break;
      case "deleteBoard":
        setDialog("DELETE_BOARD");
        setSelectBoards(e);
        break;
      case "deleteTask":
        setDialog("DELETE_TASK");
        setSelectBoards(e);
        break;
      case "archiveBoard":
        setDialog("ARCHIVE_BOARD");
        setSelectBoards(e);
        break;
    }
    setSelectBoards("");
  };

  return (
    <Flex className="h-full w-full" flexDirection={"column"} p={2}>
      <Flex justifyContent={"end"}>
        <div className="w-1/6">
          <Select
            value={selectBoards}
            onValueChange={(val) => handleSelect(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={selectBoards} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createBoard">Create a new Board</SelectItem>
              <SelectItem value="createTask">Create a new Task</SelectItem>
              <SelectItem value="editBoard">Edit Board</SelectItem>
              <SelectItem value="deleteBoard">Delete Board</SelectItem>
              <SelectItem value="deleteTask">Delete Task</SelectItem>
              <SelectItem value="archiveBoard">Archive Board</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Flex>
      <Flex grow={1} className="h-100 w-100">
        <BoardColumn />
      </Flex>
    </Flex>
  );
};

export default Boards;

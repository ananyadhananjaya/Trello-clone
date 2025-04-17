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
import { useBoardsStore } from "@/store/boardStore";

const Boards = () => {
  const [selectBoards, setSelectBoards] = useState("select ..");
  const { setDialog } = useDialogStore();
  const boards = useBoardsStore((state) => state.boards);

  console.log(boards)

  const handleSelect = (e: string) => {
    switch (e) {
      case "createBoard":
        setDialog("CREATE_BOARD");
        setSelectBoards(e);
    }
  };

  return (
    <Flex className="h-full w-full" flexDirection={"column"} p={2}>
      <Flex justifyContent={"end"}>
        <div className="w-1/6">
          <Select onValueChange={(val) => handleSelect(val)}>
            <SelectTrigger className="">
              <SelectValue placeholder={selectBoards} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createBoard">Create a new Board</SelectItem>
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

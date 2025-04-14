import { Flex } from "@chakra-ui/react";
import { ChevronDown, Ellipsis } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { useState } from "react";
import BoardColumn from "../pageComponents/boardColumn";

const Boards = () => {
  const [selectBoards, setSelectBoards] = useState("All");
  return (
    <Flex className="h-full w-full" flexDirection={"column"} p={2}>
      <Flex justifyContent={"end"}>
        <div className="w-1/6">
          <Select onValueChange={(val) => setSelectBoards(val)}>
            <SelectTrigger className="">
              <SelectValue placeholder={selectBoards} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 1</SelectItem>
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

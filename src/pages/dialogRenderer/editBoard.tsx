import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { Button } from "@/components/ui/button";
import { Required } from "@/components/utilComps";
import { useBoardsStore } from "@/store/boardStore";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

interface EditBoardDialogProps {
  open: boolean;
  onClose: () => void;
  data?: Record<string, any>;
}

const EditBoard = ({ open, onClose }: EditBoardDialogProps) => {
  const [newBoardName, setNewBoardName] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [selectedBoard, setSelectedBoard] = useState<string>("");

  const boards = useBoardsStore((state) => state.boards);
  const updateBoards = useBoardsStore((state) => state.updateBoards);

  const handleSaveChanges = () => {
    updateBoards(Number(selectedBoard), newBoardName, newDescription).then(
      () => {
        onClose();
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-4 p-6">
        <DialogTitle>Edit Board</DialogTitle>
        <DialogDescription>
          Edit the details of your board here.
        </DialogDescription>

        <Flex gap={2} direction="column" className="w-full">
          <Label>
            Board Name <Required />
          </Label>
          <Select value={selectedBoard} onValueChange={setSelectedBoard}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Board" />
            </SelectTrigger>
            <SelectContent>
              {boards.map((board) => (
                <SelectItem key={board.id} value={board.id.toString()}>
                  {board.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Flex>
        <Flex gap={4} direction="column">
          <div>
            <Label htmlFor="title">
              New Board Name <Required />
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="New Board Name"
              onChange={(e) => setNewBoardName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              placeholder="Description"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
        </Flex>

        <Flex justifyContent="space-between" gap={4}>
          <Button
            className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700 focus:ring-2 "
            onClick={() => onClose()}
          >
            Close
          </Button>
          <Button
            className="bg-blue-700 text-white p-3 rounded-md hover:bg-green-600"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

export default EditBoard;

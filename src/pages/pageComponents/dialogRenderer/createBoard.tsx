import { createBoard, } from "@/api/board";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Button } from "@/components/ui/button";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

interface CreateBoardDialogProps {
  open: boolean;
  onClose: () => void;
  data?: Record<string, any>; // (optional, if you pass extra data)
}

export default function CreateBoardDialog({
  open,
  onClose,
  data,
}: CreateBoardDialogProps) {
  const [boardName, setBoardName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  async function handleCreateBoard() {
    try {
      const newBoard = await createBoard(boardName, description);
      console.log("Board created!!");
      onClose();
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-4 p-6">
        <DialogTitle>Create New Board</DialogTitle>
        <DialogDescription>
          Give your board a name and start planning your work!
        </DialogDescription>

        <Flex gap={4} direction="column">
          <div>
            <Label htmlFor="title">
              Title <span className="text-red-600">*</span>
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Title"
              onChange={(e) => setBoardName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </Flex>
        <Flex justifyContent="space-between" gap={4}>
          <Button
            className="bg-red-600 text-white p-3 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
            type="reset"
            onClick={() => onClose()}
          >
            Close
          </Button>
          <Button
            className="bg-blue-700 text-white p-3 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-300"
            type="submit"
            onClick={handleCreateBoard}
          >
            Create
          </Button>
        </Flex>
      </DialogContent>
    </Dialog>
  );
}

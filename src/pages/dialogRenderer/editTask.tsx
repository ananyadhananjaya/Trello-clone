import { useEffect, useState } from "react";
import { Tasks, useBoardsStore } from "@/store/boardStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { Flex } from "@chakra-ui/react";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Required } from "@/components/utilComps";
import { CustomDatePicker } from "@/components/customDatePicker";
import { Button } from "@/components/shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import FlagsSelect from "@/components/flagsSelect";

interface EditTaskDialogProps {
  open: boolean;
  onClose: () => void;
  data: Tasks;
}

const EditTask = ({ open, onClose, data }: EditTaskDialogProps) => {
  const [title, setTitle] = useState<string>(data.title);
  const [description, setDescription] = useState<string>(
    data.description || ""
  );
  const [dueOn, setDueOn] = useState<Date | undefined>(new Date(data.due_date));
  const [board, setBoard] = useState<string>(data.board_id.toString());
  const [flags, setFlags] = useState<string[]>(JSON.parse(data.flags.toString()) || []);

  const boards = useBoardsStore().boards || [];
  const { updateTask } = useBoardsStore();

  const handleSave = () => {
    const editedTask: Tasks = {
      ...data,
      title,
      description,
      due_date: dueOn?.toISOString() || "",
      board_id: parseInt(board),
      flags: flags,
    };

    // console.log("Edited Task:", editedTask);

    updateTask(editedTask).then(() => onClose());
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>
          Edit the details of your task here.
        </DialogDescription>

        <Flex gap={2} direction="column" className="w-full">
          <Flex direction="column" gap={2}>
            <Label htmlFor="taskTitle">
              Title <Required />
            </Label>
            <Input
              type="text"
              id="taskTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Flex>

          <Flex direction="column" gap={2} className="mt-4">
            <Label htmlFor="taskDescription">Description</Label>
            <Input
              id="taskDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Flex>
        </Flex>

        <Flex justifyContent={"space-between"} gap={8}>
          <Flex flex={1} direction={"column"} gap={1}>
            <Label htmlFor="taskBoard">
              Board <Required />
            </Label>
            <Select value={board} onValueChange={(e) => setBoard(e)}>
              <SelectTrigger className="w-full" id="taskBoard">
                <SelectValue placeholder="Select a board" />
              </SelectTrigger>
              <SelectContent>
                {boards.map((it) => {
                  return (
                    <SelectItem value={it.id.toString()} key={it.id + it.name}>
                      {it.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </Flex>
          <Flex direction={"column"} gap={1} flex={1}>
            <Label htmlFor="taskFlags">Flags</Label>
            <FlagsSelect value={flags} onChange={(e) => setFlags(e)} />
          </Flex>
        </Flex>

        <Flex gap={2} className="w-full mt-4">
          <Flex direction="column" gap={2} className="w-full">
            <Label>
              Created Date <Required />
            </Label>
            <Input
              type="text"
              value={new Date(data.created_on).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              disabled
            />
          </Flex>

          <Flex direction="column" gap={2} className="w-full">
            <Label>
              Due Date <Required />
            </Label>
            <CustomDatePicker onChange={(e) => setDueOn(e)} value={dueOn} />
          </Flex>
        </Flex>

        <Flex justifyContent="space-between" gap={4}>
          <Button
            className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700"
            type="reset"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="bg-blue-700 text-white p-3 rounded-md hover:bg-green-600"
            type="submit"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;

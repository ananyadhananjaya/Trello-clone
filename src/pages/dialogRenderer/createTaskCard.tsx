// import { createTask } from "@/api/task"; // your API call
import { CustomDatePicker } from "@/components/customDatePicker";
import FlagsSelect from "@/components/flagsSelect";
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
import { fetchTasksToStore, useBoardsStore } from "@/store/boardStore";
import { supabase } from "@/supabaseClient";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

interface CreateTaskDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateTaskDialog({
  open,
  onClose,
}: CreateTaskDialogProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [board, setBoard] = useState<string>("");
  const [flags, setFlags] = useState<string[]>([]);
  const [createdOn, setCreatedOn] = useState<Date>();
  const [dueOn, setDueOn] = useState<Date>();

  const boards = useBoardsStore().boards || [];

  async function handleCreateTask() {
    try {
      const { data, error } = await supabase
        .from("task_cards") 
        .insert([
          {
            title: title,
            description: description,
            flags: flags,
            created_on: createdOn,
            due_date: dueOn,
            board_id: board,
          },
        ])

      if (error) throw error;
      fetchTasksToStore();
      onClose();

    } catch (err) {
      console.error("Error creating task:", err);
    }
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-4 p-6">
        <DialogTitle>Create New Task</DialogTitle>
        <DialogDescription>
          Add a title and optional description to your task.
        </DialogDescription>

        <Flex gap={4} direction="column">
          <div>
            <Label htmlFor="task-title">
              Title <Required />
            </Label>
            <Input
              id="task-title"
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="task-description">Description</Label>
            <Input
              id="task-description"
              type="text"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
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

        <Flex gap={8} justifyContent={"space-between"}>
          <Flex gap={1} flex={1} direction={"column"}>
            <Label>Created Date</Label>
            <CustomDatePicker
              onChange={(e) => setCreatedOn(e)}
              value={createdOn}
            />
          </Flex>
          <Flex gap={1} flex={1} direction={"column"}>
            <Label>
              Due Date <Required />
            </Label>
            <CustomDatePicker onChange={(e) => setDueOn(e)} value={dueOn} />
          </Flex>
        </Flex>

        <Flex justifyContent="space-between" gap={4}>
          <Button
            className="bg-red-600 text-white p-3 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
            type="reset"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="bg-blue-700 text-white p-3 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-300"
            type="submit"
            onClick={handleCreateTask}
          >
            Create
          </Button>
        </Flex>
      </DialogContent>
    </Dialog>
  );
}

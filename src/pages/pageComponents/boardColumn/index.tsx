import { useEffect, useState } from "react";
import TaskCard from "../taskCard";
import { Board, fetchTasksToStore, useBoardsStore } from "@/store/boardStore";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Droppable from "./droppable";
import Draggable from "./draggable";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { supabase } from "@/supabaseClient";

const BoardColumn = () => {
  const [boardCols, setBoardCols] = useState<Board[]>([]);
  const { boards, tasks, setTasks, updateReorderTasks } = useBoardsStore();

  useEffect(() => {
    setBoardCols(boards);
  }, [boards]);

  const items = tasks.map((task) => task.id + task.board_id + task.title);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.data.current?.id;
    const overId = over.data.current?.id;
    if (!activeId || !overId) return;

    // 🟰 Reordering within the same board

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    const activeBoardId = activeData.board_id;
    const overBoardId = overData.board_id;

    if (activeBoardId === overBoardId) {
      // Same board
      const activeOrderIndex = activeData.order_index;
      const overOrderIndex = overData.order_index;
      const updatedTasks = arrayMove(tasks, activeOrderIndex, overOrderIndex);

      // Then batch update them all:
      const updates = updatedTasks.map((task, idx) => ({
        id: task.id,
        order_index: idx,
      }));

      console.log("Updates", updates);

      // Now update in Supabase:
      await Promise.all(
        updates.map(({ id, order_index }) =>
          updateReorderTasks(id, order_index)
        )
      ).then(() => {
        fetchTasksToStore();
      });
    } else {
      // Different boards
      console.log("Different boards", activeData, overData);
      const fromBoardId = activeBoardId;
      const toBoardId = overBoardId;
  
      const { data: tasksInTargetBoard } = await supabase
        .from("task_cards")
        .select("id, order_index")
        .eq("board_id", toBoardId)
        .neq("id", activeId)
        .order("order_index", { ascending: true });
  
      if (!tasksInTargetBoard) return;
  
      // Insert the dragged task at the over task’s index
      const insertIndex = tasksInTargetBoard.findIndex(
        (t) => t.id === overId
      );
  
      tasksInTargetBoard.splice(insertIndex, 0, { id: activeId, order_index: 0 });
  
      const reorderUpdates = tasksInTargetBoard.map((task, idx) => ({
        id: task.id,
        order_index: idx,
      }));
  
      // 1. Move the dragged task to new board
      // await supabase
      //   .from("task_cards")
      //   .update({ board_id: toBoardId })
      //   .eq("id", activeId);
  
      // 2. Update all order_index values in the target board

      console.log("Reorder Updates", reorderUpdates, tasksInTargetBoard);
      // await Promise.all(
      //   reorderUpdates.map(({ id, order_index }) =>
      //     updateReorderTasks(id, order_index)
      //   )
      // );
    }
  };

  const renderBoard = (board: Board) => {
    const tasksForBoard = tasks.filter((task) => task.board_id === board.id);

    return (
      <div
        className="flex flex-col gap-4 rounded-sm dark:bg-gray-800 bg-slate-200 p-2 h-full"
        style={{ width: "260px", minWidth: "260px" }}
      >
        <div className="font-bold text-xs text-gray-500 dark:text-gray-300 pl-2 mt-1">
          {board.name.toUpperCase()}
        </div>
        <div className="flex flex-col gap-2 pt-2">
          {tasksForBoard.map((task) => (
            <div onClick={(e) => e.stopPropagation()}>
              <TaskCard card={task} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-x-auto p-2">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={items}>
          <div className="flex gap-4 h-full w-full">
            {boardCols.map((board) => renderBoard(board))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default BoardColumn;

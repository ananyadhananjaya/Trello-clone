import { useEffect, useState } from "react";
import TaskCard from "../taskCard";
import { Board, fetchTasksToStore, useBoardsStore } from "@/store/boardStore";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Droppable from "./droppable";
import Draggable from "./draggable";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { supabase } from "@/supabaseClient";

const BoardColumn = () => {
  const [boardCols, setBoardCols] = useState<Board[]>([]);
  const { boards, tasks, setTasks, updateReorderTasks } = useBoardsStore();
  const [activeTask, setActiveTask] = useState<any>(null);

  useEffect(() => {
    setBoardCols(boards);
  }, [boards]);

  const items = tasks.map((task) => task.id + task.board_id + task.title);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.data.current?.id;
    if (!activeId) return;

    // 🟰 Set the active task to be dragged
    const activeData = active.data.current;
    setActiveTask(activeData);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.data.current?.id;
    const overId = over.data.current?.id;
    if (!activeId || !overId) return;

    const activeData = active.data.current;
    const overData = over.data.current;
    if (!activeData || !overData) return;

    const activeBoardId = activeData.board_id;
    const overBoardId = overData.board_id;

    if (activeBoardId === overBoardId) {
      // ✅ Same board reorder
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      const updated = arrayMove(tasks, activeIndex, overIndex);

      const updates = updated.map((task, idx) => ({
        id: task.id,
        order_index: idx,
      }));

      await Promise.all(
        updates.map(({ id, order_index }) =>
          updateReorderTasks(id, order_index)
        )
      );

      fetchTasksToStore(); // refresh
    } else {
      // ✅ Cross-board move
      const fromBoardId = activeBoardId;
      const toBoardId = overBoardId || overData.id;

      const { data: targetBoardTasks } = await supabase
        .from("task_cards")
        .select("id, order_index")
        .eq("board_id", toBoardId)
        .neq("id", activeId)
        .order("order_index", { ascending: true });

      if (!targetBoardTasks) return;

      // Insert the dragged task at the target index or at end if empty
      let insertIndex = targetBoardTasks.findIndex((t) => t.id === overId);
      if (insertIndex === -1) insertIndex = targetBoardTasks.length;

      targetBoardTasks.splice(insertIndex, 0, {
        id: activeId,
        order_index: 0, // temp
      });

      const reorderUpdates = targetBoardTasks.map((task, idx) => ({
        id: task.id,
        order_index: idx,
      }));

      // Move the dragged task to new board
      await supabase
        .from("task_cards")
        .update({ board_id: toBoardId })
        .eq("id", activeId);

      // Update order_index values
      await Promise.all(
        reorderUpdates.map(({ id, order_index }) =>
          updateReorderTasks(id, order_index)
        )
      );

      fetchTasksToStore();
    }
  };

  const renderBoard = (board: Board) => {
    const tasksForBoard = tasks
      .filter((task) => task.board_id === board.id)
      .sort((a, b) => a.order_index - b.order_index);

    return (
      <div
        className="flex flex-col gap-4 rounded-sm dark:bg-gray-800 bg-slate-200 p-2 h-full"
        style={{ width: "260px", minWidth: "260px" }}
      >
        <div className="font-bold text-xs text-gray-500 dark:text-gray-300 pl-2 mt-1">
          {board.name.toUpperCase()}
        </div>
        <SortableContext
          items={tasksForBoard.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2 pt-2">
            {tasksForBoard.map((task) => (
              <Draggable key={task.id} id={task.id} data={task}>
                <div onClick={(e) => e.stopPropagation()}>
                  <TaskCard card={task} />
                </div>
              </Draggable>
            ))}
          </div>
        </SortableContext>
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-x-auto p-2">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <div className="flex gap-4 h-full w-full">
          {boardCols.map((board) => (
            <Droppable key={board.id} id={board.id} data={board}>
              {renderBoard(board)}
            </Droppable>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard card={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default BoardColumn;

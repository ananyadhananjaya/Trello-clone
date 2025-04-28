import { useEffect, useState } from "react";
import TaskCard from "../taskCard";
import { Board, useBoardsStore } from "@/store/boardStore";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./droppable";
import { arrayMove } from "@dnd-kit/sortable";
import Draggable from "./draggable";

const BoardColumn = () => {
  const [boardCols, setBoardCols] = useState<Board[]>([]);
  const { boards, tasks, setTasks } = useBoardsStore();

  useEffect(() => {
    setBoardCols(boards);
  }, [boards.length]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const draggedTask = tasks.find((t) => t.id === activeId);
    if (!draggedTask) return;

    const boardTarget = boards.find((b) => b.id + b.name === overId);

    if (boardTarget) {
      setTasks(draggedTask.id, boardTarget.id);
    }
  };

  const getBoardCols = (board: Board) => {
    const tasksForBoard = tasks.filter((task) => task.board_id === board.id);

    return (
      <Droppable id={board.id + board.name}>
        <div
          className="flex flex-col gap-4 rounded-xl dark:bg-gray-800 bg-white p-3 h-full"
          key={board.id + board.name}
          style={{ width: "260px", minWidth: "260px" }}
        >
          <span className="font-semibold text-sm">{board.name}</span>
          <span className="font-light text-xs">{board.description || ""}</span>

          {tasksForBoard.map((task, ind) => (
            <Draggable id={task.id} key={task.id}>
              <TaskCard card={task} />
            </Draggable>
          ))}
        </div>
      </Droppable>
    );
  };

  return (
    <div className="h-full w-full overflow-x-auto p-4">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 h-full w-full">
          {boardCols.map((board) => getBoardCols(board))}
        </div>
      </DndContext>
    </div>
  );
};

export default BoardColumn;

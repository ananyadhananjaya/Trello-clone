import { useEffect, useState } from "react";
import TaskCard from "../taskCard";
import { Board, useBoardsStore } from "@/store/boardStore";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Droppable from "./droppable";
import Draggable from "./draggable";
import { arrayMove } from "@dnd-kit/sortable";

const BoardColumn = () => {
  const [boardCols, setBoardCols] = useState<Board[]>([]);
  const { boards, tasks, setTasks } = useBoardsStore();

  useEffect(() => {
    setBoardCols(boards);
  }, [boards]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // 🟰 Dragging a Board
    const activeBoard = boards.find((b) => b.id === activeId);
    const overBoard = boards.find((b) => b.id === overId);

    if (activeBoard && overBoard) {
      const oldIndex = boardCols.findIndex((b) => b.id === activeId);
      const newIndex = boardCols.findIndex((b) => b.id === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        setBoardCols((prev) => arrayMove(prev, oldIndex, newIndex));
      }
      return;
    }

    // 🟰 Dragging a Task
    const draggedTask = tasks.find((t) => t.id === activeId);
    if (!draggedTask) return;

    const boardTarget = boards.find((b) => b.id + b.name === overId);
    if (boardTarget) {
      setTasks(draggedTask.id, boardTarget.id);
    }
  };

  const renderBoard = (board: Board) => {
    const tasksForBoard = tasks.filter((task) => task.board_id === board.id);

    return (
      <div
        className="flex flex-col gap-4 rounded-xl dark:bg-gray-800 bg-white p-3 h-full"
        style={{ width: "260px", minWidth: "260px" }}
      >
        <div className="font-semibold text-sm">{board.name}</div>
        <div className="font-light text-xs">{board.description || ""}</div>

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
    <div className="h-full w-full overflow-x-auto p-4">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 h-full w-full">
          {boardCols.map((board) => renderBoard(board))}
        </div>
      </DndContext>
    </div>
  );
};

export default BoardColumn;

// const renderBoard = (board: Board) => {
//   const tasksForBoard = tasks.filter((task) => task.board_id === board.id);

//   return (
//     <Draggable key={board.id} id={board.id}>
//       <div
//         className="flex flex-col gap-4 rounded-xl dark:bg-gray-800 bg-white p-3 h-full"
//         style={{ width: "260px", minWidth: "260px" }}
//       >
//         <div className="font-semibold text-sm">{board.name}</div>
//         <div className="font-light text-xs">{board.description || ""}</div>
//         <Droppable id={board.id + board.name}>
//           <div className="flex flex-col gap-2 pt-2">
//             {tasksForBoard.map((task) => (
//               <Draggable key={task.id} id={task.id}>
//                 <div onClick={(e) => e.stopPropagation()}>
//                   <TaskCard card={task} />
//                 </div>
//               </Draggable>
//             ))}
//           </div>
//         </Droppable>
//       </div>
//     </Draggable>
//   );
// };

import { useEffect, useState } from "react";
import TaskCard from "../taskCard";
import { Board, useBoardsStore } from "@/store/boardStore";

const BoardColumn = () => {

  const [boardCols, setBoardCols] = useState<Board[]>([])
  const boards = useBoardsStore().boards;
  const tasks = useBoardsStore().tasks;

  console.log(tasks, boards)

  useEffect(() => {
    setBoardCols(boards)
  }, [boards])


  const getBoardCols = (it: Board) => {
    const tasksForBoard = tasks.filter((task) => task.board_id === it.id);
    return (
      <div
        className="flex flex-col gap-4 rounded-xl dark:bg-gray-800 bg-white p-3 h-full"
        key={it.id+it.name}
        style={{ width: "260px", minWidth: "260px" }}
      >
        <span className="font-semibold text-sm">{it.name}</span>
        <span className="font-light text-xs">{it.description || ''}</span>
        {tasksForBoard.map((it, ind) => (
          <TaskCard key={ind} card={it} />
        ))}
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-x-auto p-4">
      <div className="flex gap-4 h-full w-full">
        {boardCols.map((it) => getBoardCols(it))}
      </div>
    </div>
  );
};

export default BoardColumn;

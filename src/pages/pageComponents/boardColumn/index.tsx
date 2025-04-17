import { useEffect } from "react";
import TaskCard from "../taskCard";

const BoardColumn = () => {

  const getBoardCols = (it: number) => {
    return (
      <div
        className="flex flex-col gap-4 rounded-xl dark:bg-gray-800 bg-white p-3 h-full"
        key={it}
        style={{ width: "260px", minWidth: "260px" }}
      >
        <span className="font-semibold text-sm">Planned</span>
        {[1, 2, 3, 4].map((it, ind) => (
          <TaskCard key={ind} />
        ))}
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-x-auto p-4">
      <div className="flex gap-4 h-full w-full">
        {[1, 2, 3, 4].map((it, ind) => getBoardCols(ind))}
      </div>
    </div>
  );
};

export default BoardColumn;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import BoardFlags from "../taskCard/boardFlags";
import { Calendar, Clock4, EllipsisVertical } from "lucide-react";
import { Tasks } from "@/store/boardStore";
import { useDialogStore } from "@/store/dialogStore";

interface TaskCardProps {
  card: Tasks;
}

const TaskCard = ({ card }: TaskCardProps) => {
  const { setDialog } = useDialogStore();

  const getDueColor = (dueDateStr: string) => {
    const dueDate = new Date(dueDateStr);
    const today = new Date();

    const diffInTime = dueDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    if (diffInDays < 0) return "text-red-500 dark: text-red-700"; // 🔴 Overdue
    if (diffInDays <= 3) return "text-orange-500 dark: text-orange-700"; // 🟠 Due in 3 days
    if (diffInDays <= 7) return "text-yellow-500 dark: text-yellow-700"; // 🟡 Due in 7 days
    return "text-green-600 dark:text-green-700"; // Default
  };

  const handleTaskClick = (e: React.MouseEvent) => {
    setDialog("EDIT_TASK", card);
  };

  const getBannerColor = (daysInBoard: number) => {
    if (daysInBoard < 5) return "bg-green-500";
    if (daysInBoard < 10) return "bg-yellow-500";
    return "bg-red-500";
  };

  const daysInBoard = Math.floor(
    (Date.now() - new Date(card.entered_board_on).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const dueDate = card.due_date;

  return (
    <Card
      className="border-none flex shadow-none rounded-md w-full dark:bg-slate-950 cursor-pointer"
      onClick={handleTaskClick}
    >
      <div className={`w-1 ${getBannerColor(daysInBoard)} rounded-l-md`} />
      <div className="flex-1">
        <CardHeader>
          <BoardFlags flags={JSON.parse(card.flags.toString())} />
          <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-50">
            {card.title}
          </CardTitle>
          <CardDescription className="text-xs">
            {card.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between">
          <div className="flex text-xs gap-1 text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <p>
              {new Date(card.created_on).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
          <div className={`flex text-xs gap-1 ${getDueColor(dueDate)}`}>
            <Clock4 size={14} />
            <p>
              {new Date(dueDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default TaskCard;

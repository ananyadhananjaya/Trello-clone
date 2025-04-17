import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import BoardFlags from "../taskCard/boardFlags";
import { Calendar, Clock4 } from "lucide-react";

const TaskCard = () => {
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

  const dueDate = "2025-04-17";

  return (
    <Card className="border-2 shadow-none rounded-xl w-full dark:bg-slate-950">
      <CardHeader>
        <BoardFlags flags={["urgent", "completed", "blocked", "in-progress"]} />
        <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-50">
          Monthly Product Discussion
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="flex text-xs gap-1 text-slate-500 dark:text-slate-400">
          <Calendar size={14} />
          <p>{new Date().toLocaleDateString("en-US", { day: "numeric", month: "short" })}</p>
        </div>
        <div className={`flex text-xs gap-1 ${getDueColor(dueDate)}`}>
          <Clock4 size={14} />
          <p>{new Date(dueDate).toLocaleDateString("en-US", { day: "numeric", month: "short" })}</p>
        </div>
      </CardContent>
    </Card>
  );
};


export default TaskCard;
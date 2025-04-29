
interface BoardFlagsProps {
  flags: string[];
}

const BoardFlags = ({ flags }: BoardFlagsProps) => {
  const getFlagStyles = (flag: string) => {
    switch (flag) {
      case "urgent":
        return "bg-red-100 text-red-600";
      case "blocked":
        return "bg-yellow-100 text-yellow-700";
      case "in_progress":
        return "bg-blue-100 text-blue-600";
      case "completed":
        return "bg-green-100 text-green-600";
      case "bug":
        return "bg-rose-100 text-rose-600";
      case "feature":
        return "bg-cyan-100 text-cyan-600";
      case "design":
        return "bg-pink-100 text-pink-600";
      case "testing":
        return "bg-purple-100 text-purple-600";
      case "low_priority":
        return "bg-gray-100 text-gray-500";
      case "medium_priority":
        return "bg-orange-100 text-orange-500";
      case "high_priority":
        return "bg-orange-200 text-orange-700";
      case "discussion":
        return "bg-teal-100 text-teal-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  

  const getFlags = (flag: string) => {
    return (
      <span
        key={flag}
        className={`font-semibold w-fit rounded py-1 mr-2 mb-1 ${getFlagStyles(
          flag
        )}`}
        style={{
          fontSize: "10px",
          padding: "2px",
          paddingLeft: "4px",
          paddingRight: "4px",
        }}
      >
        {flag.toUpperCase()}
      </span>
    );
  };
  return (
    <div className="flex flex-wrap">
      {flags.map((it: string) => getFlags(it))}
    </div>
  );
};

export default BoardFlags;


interface BoardFlagsProps {
  flags: string[];
}

const BoardFlags = ({ flags }: BoardFlagsProps) => {
  const getFlagStyles = (flag: string) => {
    switch (flag) {
      case "urgent":
        return "bg-red-100 text-red-600";
      case "in-progress":
        return "bg-yellow-100 text-yellow-600";
      case "completed":
        return "bg-green-100 text-green-600";
      case "blocked":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getFlags = (flag: string) => {
    return (
      <span
        key={flag}
        className={`font-bold w-fit rounded py-1 mr-2 mb-1 ${getFlagStyles(
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

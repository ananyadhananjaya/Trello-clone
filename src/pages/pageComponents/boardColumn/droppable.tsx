import { useDroppable } from "@dnd-kit/core";

export default function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id || undefined,
    data: props.data || undefined,
  });

  return (
    <div className="flex gap-2 h-full w-full" ref={setNodeRef}>
      {props.children}
    </div>
  );
}

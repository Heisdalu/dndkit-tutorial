/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = (props: any) => {
  const { listeners, attributes, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={props.opacity === "yes" ? "yes" : "no"}
    >
      <div className={props.opacity === "yes" ? "yes card" : "no card"}>
        {props.id}
      </div>
    </div>
  );
};

export default SortableItem;

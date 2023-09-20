/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import {
  DndContext, // dnd context
  closestCenter,
  useSensor, // individual sensor for touch, pointer, mouse,
  useSensors, // parent sensor that groups the indiivdual sensor to one
  TouchSensor, // touch sensor
  DragOverlay, // drag overlay.. when dragged you see an overlay
  MouseSensor, // mouse sensor
} from "@dnd-kit/core";
import SortableItem from "./SortableItem";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

function App() {
  const [lang, setLang] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [activeElem, setACtiveElem] = useState<number | null>(null);

  const touchSens = useSensor(TouchSensor);
  const mouseSens = useSensor(MouseSensor);
  const sensors = useSensors(touchSens, mouseSens);

  const handleDragEnd = (e: any) => {
    const { active, over } = e;
    setACtiveElem(null); // make opacity none when drag stops

    // do not interchange when id is undefined
    if (!active.id && !over.id) return;

    // interchange elem when drags end
    if (active?.id !== over?.id) {
      setLang((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over?.id);
        
        console.log(arrayMove(items, 5, 6));
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  const start = (e) => {
    setACtiveElem(e.active.id);
  };

  console.log(activeElem);

  return (
    <>
      <div>
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={start}
        >
          <div className="app">
            <h1 className="head"> Cards</h1>
            <div className="okay">
              <SortableContext items={lang} strategy={rectSortingStrategy}>
                {/* {children} */}
                {lang.map((el) => (
                  <SortableItem
                    key={el}
                    id={el}
                    opacity={activeElem === el ? "yes" : "no"}
                  />
                ))}
              </SortableContext>

              {/* show overlay when dragged , you can comment this aspect to see the differnce */}
              {/* i you do not want an empty space to be shown when dragged, you can drop a shadow of the dragged element there */}
              <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
                {activeElem ? (
                  <SortableItem id={activeElem} opacity={"no"} />
                ) : null}
              </DragOverlay>
            </div>
          </div>
        </DndContext>
      </div>
    </>
  );
}

export default App;

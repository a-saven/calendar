import React, { useRef, useEffect } from "react";
import { Event } from "./hooks";

interface DayEventsProps {
  events: Event[];
  onDelete: (id: string) => void;
  onRearrange: (events: Event[]) => void;
}

const DayEvents: React.FC<DayEventsProps> = ({ events, onDelete, onRearrange }) => {
  const dragItem = useRef<any>();
  const dragItemNode = useRef<any>();

  useEffect(() => {
    const currentNode = dragItemNode.current;

    const handleDragStart = (e: any, index: number) => {
      dragItem.current = index;
      e.dataTransfer.effectAllowed = "move";
    };

    const handleDragEnd = () => {
      dragItem.current = null;
    };

    currentNode.addEventListener("dragstart", handleDragStart);
    currentNode.addEventListener("dragend", handleDragEnd);

    return () => {
      currentNode.removeEventListener("dragstart", handleDragStart);
      currentNode.removeEventListener("dragend", handleDragEnd);
    };
  }, []);

  const handleDragStart = (e: any, index: number) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnter = (e: any, targetItem: number) => {
    if (dragItemNode.current !== targetItem) {
      const newArr = [...events];
      newArr.splice(targetItem, 0, newArr.splice(dragItem.current!, 1)[0]);
      dragItem.current = targetItem;
      onRearrange(newArr);
    }
  };

  return (
    <div>
      <h2>Events for Today</h2>
      <ul ref={dragItemNode}>
        {events.map((event, index) => (
          <li
            key={event.id}
            draggable
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragStart={(e) => handleDragStart(e, index)}
          >
            <span>{event.description}</span>
            <button onClick={() => onDelete(event.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DayEvents;

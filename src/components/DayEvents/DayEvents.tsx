import React, { useRef, useEffect } from "react";
import { Event } from "../utils/EventTypes";
import { format } from "date-fns";
import "./DayEvents.css";

interface DayEventsProps {
  events: Event[];
  selectedDate: Date | null;
  onDelete: (id: string) => void;
  onRearrange: (events: Event[]) => void;
  onEdit: (event: Event) => void;
  setShowModal: (flag: boolean) => void;
}

const DayEvents: React.FC<DayEventsProps> = ({ events, selectedDate, onDelete, onEdit, onRearrange, setShowModal }) => {
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

  const filteredEvents = events.filter((event) => selectedDate?.toDateString() === event.date.toDateString());

  return (
    <div className="day-events-container">
      <h2>Events for {format(selectedDate!, "MMMM do, yyyy")}</h2>
      <ul ref={dragItemNode}>
        <button className="icon-button" onClick={() => setShowModal(true)}>
          ➕
        </button>
        {filteredEvents.map((event, index) => (
          <li
            key={event.id}
            className="draggable-event event-item"
            draggable
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragStart={(e) => handleDragStart(e, index)}
          >
            <div className="event-description">
              <span>{event.description}</span>
            </div>
            <div>
              <button className="icon-button edit-button" onClick={() => onEdit(event)}>
                ✏️
              </button>
              <button className="icon-button delete-button" onClick={() => onDelete(event.id)}>
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DayEvents;

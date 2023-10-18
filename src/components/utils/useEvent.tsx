import { useState, SetStateAction, Dispatch } from "react";
import { isToday } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export interface Event {
  id: string;
  date: Date;
  description: string;
}

interface UseEventReturn {
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
  eventDesc: string;
  setEventDesc: Dispatch<SetStateAction<string>>;
  hasEvent: (date: Date) => boolean;
  addEvent: () => void;
  getDayClass: (day: Date, selectedDate: Date | null) => string;
  deleteEvent: (id: string) => void;
  rearrangEvent: (newOrderEvents: Event[]) => void;
  editEvent: (updatedEvent: Event) => void;
  isEditing: boolean;
  startEditEvent: (event: Event) => void;
  updateEvent: () => void;
}

export const useEvent = (initialEvents: Event[], currentDate: Date): UseEventReturn => {
  const [events, setEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(currentDate);
  const [eventDesc, setEventDesc] = useState<string>("");
  // Add these new states to handle editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);

  // New function to start editing an event
  const startEditEvent = (event: Event) => {
    setIsEditing(true);
    setSelectedDate(event.date);
    setEventDesc(event.description);
    setShowModal(true);
    setEditedEvent(event);
  };

  // Function to update an event
  const updateEvent = () => {
    if (editedEvent) {
      setEvents(events.map((e) => (e.id === editedEvent.id ? { ...editedEvent, description: eventDesc } : e)));
      setIsEditing(false);
      setShowModal(false);
    }
  };

  const hasEvent = (date: Date): boolean => events.some((event) => event.date.toDateString() === date.toDateString());

  const addEvent = (): void => {
    if (selectedDate) {
      const newEvent: Event = {
        id: uuidv4(),
        date: selectedDate,
        description: eventDesc,
      };
      setEvents([...events, newEvent]);
      setShowModal(false);
      setEventDesc("");
    }
  };

  const editEvent = (updatedEvent: Event): void => {
    const newEvents = events.map((event) => {
      if (event.id === updatedEvent.id) return updatedEvent;
      return event;
    });
    setEvents(newEvents);
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const rearrangEvent = (newOrderEvents: Event[]) => {
    setEvents(newOrderEvents);
  };

  const getDayClass = (day: Date, selectedDate: Date | null): string => {
    let classes = "";
    const isTodayDate = isToday(day);

    if (isTodayDate && hasEvent(day)) classes += " today-event";
    else if (isTodayDate) classes += " today";
    else if (hasEvent(day)) classes += " event";

    if (selectedDate && selectedDate.toDateString() === day.toDateString()) classes += " selected";

    return classes.trim();
  };

  return {
    events,
    setEvents,
    showModal,
    setShowModal,
    selectedDate,
    setSelectedDate,
    eventDesc,
    setEventDesc,
    hasEvent,
    addEvent,
    getDayClass,
    deleteEvent,
    editEvent,
    rearrangEvent,
    isEditing,
    startEditEvent,
    updateEvent,
  };
};

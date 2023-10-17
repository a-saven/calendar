import { useState, SetStateAction, Dispatch } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, isToday } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export interface Event {
  id: string;
  date: Date;
  description: string;
}

interface UseCalendarReturn {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  days: Date[];
}

export const useCalendar = (initialDate: Date): UseCalendarReturn => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  return {
    currentDate,
    setCurrentDate,
    days,
  };
};

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
}

export const useEvent = (initialEvents: Event[], currentDate: Date): UseEventReturn => {
  const [events, setEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(currentDate);
  const [eventDesc, setEventDesc] = useState<string>("");

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
  };
};

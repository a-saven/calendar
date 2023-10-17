import { useState, SetStateAction, Dispatch } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, isToday } from "date-fns";

interface Event {
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
  getDayClass: (day: Date) => string;
}

export const useEvent = (initialEvents: Event[]): UseEventReturn => {
  const [events, setEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventDesc, setEventDesc] = useState<string>("");

  const hasEvent = (date: Date): boolean => events.some((event) => event.date.toDateString() === date.toDateString());

  const addEvent = (): void => {
    if (selectedDate) {
      setEvents([...events, { date: selectedDate, description: eventDesc }]);
      setShowModal(false);
      setEventDesc("");
    }
  };

  const getDayClass = (day: Date): string => {
    const isTodayDate = isToday(day);
    if (isTodayDate && hasEvent(day)) return "today-event";
    if (isTodayDate) return "today";
    if (hasEvent(day)) return "event";
    return "";
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
  };
};

import { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, isToday } from "date-fns";

interface Event {
  date: Date;
  description: string;
}

export const useCalendar = (initialDate: Date) => {
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

export const useEvent = (initialEvents: Event[]) => {
  const [events, setEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventDesc, setEventDesc] = useState<string>("");

  const hasEvent = (date: Date) => events.some((event) => event.date.toDateString() === date.toDateString());

  const addEvent = () => {
    if (selectedDate) {
      setEvents([...events, { date: selectedDate, description: eventDesc }]);
      setShowModal(false);
      setEventDesc("");
    }
  };

  const getDayClass = (day: Date) => {
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

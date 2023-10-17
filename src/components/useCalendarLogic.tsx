import { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, addMonths } from "date-fns";

interface Event {
  date: Date;
  description: string;
}

const useCalendarLogic = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const navigateMonth = (months: number) => {
    setCurrentDate((prevDate) => addMonths(prevDate, months));
  };

  const hasEvent = (date: Date): boolean => {
    return events.some((event) => event.date.toDateString() === date.toDateString());
  };

  const addEvent = (date: Date, description: string) => {
    setEvents([...events, { date, description }]);
  };

  return {
    currentDate,
    navigateMonth,
    days,
    hasEvent,
    addEvent,
  };
};

export default useCalendarLogic;

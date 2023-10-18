import { useState, SetStateAction, Dispatch } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

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

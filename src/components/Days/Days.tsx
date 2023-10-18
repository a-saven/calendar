import { format } from "date-fns";
import { motion } from "framer-motion";
import { Event } from "../utils/useEvent";
import "./Days.css";

interface CalendarDaysProps {
  days: Date[];
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  getDayClass: (day: Date) => string;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const CalendarDays: React.FC<CalendarDaysProps> = ({ days, getDayClass, setSelectedDate }) => {
  const firstDayOfMonth = days[0].getDay();

  // Generate an array of null values to represent blank days
  const blankDays = Array.from({ length: firstDayOfMonth }, () => null);

  // Combine blankDays and actual days
  const allDays = [...blankDays, ...days];

  return (
    <div className="calendar-container">
      {allDays.map((day, index) => (
        <motion.div
          key={day ? day.toString() : `blank-${index}`}
          className={`calendar-day ${day ? getDayClass(day!) : ""} ${day ? "" : "non-interactive"}`}
          onClick={() => {
            if (day) setSelectedDate(day);
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {day ? format(day!, "d") : ""}
        </motion.div>
      ))}
    </div>
  );
};

export default CalendarDays;

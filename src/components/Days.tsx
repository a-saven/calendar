import { format } from "date-fns";
import { motion } from "framer-motion";
import { Event } from "./hooks";

interface CalendarDaysProps {
  days: Date[];
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  getDayClass: (day: Date) => string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const CalendarDays: React.FC<CalendarDaysProps> = ({ days, getDayClass, setShowModal, setSelectedDate }) => {
  return (
    <div className="calendar-container">
      {days.map((day) => (
        <motion.div
          key={day.toString()}
          className={`calendar-day ${getDayClass(day)}`}
          onClick={() => {
            setSelectedDate(day);
            setShowModal(true);
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {format(day, "d")}
        </motion.div>
      ))}
    </div>
  );
};

export default CalendarDays;

import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isToday, getDay } from "date-fns";
import "./Calendar.css";
import { motion, AnimatePresence } from "framer-motion";

interface Event {
  date: Date;
  description: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventDesc, setEventDesc] = useState<string>("");

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const hasEvent = (date: Date) => {
    return events.some((event) => event.date.toDateString() === date.toDateString());
  };

  const addEvent = () => {
    if (selectedDate) {
      setEvents([...events, { date: selectedDate, description: eventDesc }]);
      setShowModal(false);
      setEventDesc("");
    }
  };

  const isTodayDate = (date: Date) => {
    return isToday(date);
  };

  const getDayClass = (day: Date) => {
    if (isTodayDate(day) && hasEvent(day)) return "today-event";
    if (isTodayDate(day)) return "today";
    if (hasEvent(day)) return "event";
    return "";
  };

  return (
    <div className="calendar-wrapper">
      <div className="nav-area">
        <span className="nav-button" onClick={() => setCurrentDate((prevDate) => subMonths(prevDate, 1))}>
          &lt;
        </span>
        <span>{format(currentDate, "MMMM yyyy")}</span>
        <span className="nav-button" onClick={() => setCurrentDate((prevDate) => addMonths(prevDate, 1))}>
          &gt;
        </span>
      </div>
      <div className="calendar-header">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="calendar-container">
        {Array.from({ length: getDay(start) }).map((_, idx) => (
          <div key={`empty-start-${idx}`} className="calendar-day empty"></div>
        ))}
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
        {Array.from({ length: 6 - getDay(end) }).map((_, idx) => (
          <div key={`empty-end-${idx}`} className="calendar-day emty"></div>
        ))}
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <div className="overlay" onClick={() => setShowModal(false)}>
              <div
                className="modal"
                onClick={(e) => e.stopPropagation()} // Prevent clicks on the modal from closing it
              >
                <button className="close-button" onClick={() => setShowModal(false)}>
                  X
                </button>
                <h2>Add Event for {format(selectedDate!, "MMMM do, yyyy")}</h2>
                <input type="text" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} />
                <button onClick={addEvent}>Add</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;

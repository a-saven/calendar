import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isToday } from "date-fns";
import "./Calendar.css";

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
      <div className="calendar-container">
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`calendar-day ${getDayClass(day)}`}
            onClick={() => {
              setSelectedDate(day);
              setShowModal(true);
            }}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
      {showModal && (
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
      )}
    </div>
  );
};

export default Calendar;

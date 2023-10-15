// Calendar.tsx
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import "./Calendar.css";

interface Event {
  date: Date;
  description: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);

  const days = eachDayOfInterval({ start, end });

  const addEvent = (date: Date, description: string) => {
    setEvents([...events, { date, description }]);
  };

  const hasEvent = (date: Date) => {
    return events.some((event) => event.date.toDateString() === date.toDateString());
  };

  return (
    <div>
      <button onClick={() => setCurrentDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1)))}>
        Previous
      </button>
      <button onClick={() => setCurrentDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1)))}>
        Next
      </button>
      <div className="calendar-container">
        {days.map((day: any) => (
          <div key={day.toString()} className={`calendar-day ${hasEvent(day) ? "event" : ""}`}>
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

import { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, isToday } from "date-fns";
import CalendarNav from "./Navigation";
import CalendarHeader from "./Header";
import CalendarDays from "./Days";
import EventModal from "./EventModal";
import "./Calendar.css";

interface Event {
  date: Date;
  description: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventDesc, setEventDesc] = useState<string>("");

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

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

  return (
    <div className="calendar-wrapper">
      <CalendarNav currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarHeader />
      <CalendarDays
        days={days}
        getDayClass={getDayClass}
        setShowModal={setShowModal}
        setSelectedDate={setSelectedDate}
      />
      <EventModal
        showModal={showModal}
        selectedDate={selectedDate}
        eventDesc={eventDesc}
        setEventDesc={setEventDesc}
        setShowModal={setShowModal}
        addEvent={addEvent}
      />
    </div>
  );
};

export default Calendar;

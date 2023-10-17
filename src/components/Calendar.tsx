import React from "react";
import CalendarNav from "./Navigation";
import CalendarHeader from "./Header";
import CalendarDays from "./Days";
import EventModal from "./EventModal";
import "./Calendar.css";
import { useCalendar, useEvent } from "./hooks";

const Calendar: React.FC = () => {
  const { currentDate, setCurrentDate, days } = useCalendar(new Date());
  const { showModal, setShowModal, selectedDate, setSelectedDate, eventDesc, setEventDesc, addEvent, getDayClass } =
    useEvent([]);

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

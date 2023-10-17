import React from "react";
import CalendarNav from "./Navigation";
import CalendarHeader from "./Header";
import CalendarDays from "./Days";
import EventModal from "./EventModal";
import DayEvents from "./DayEvents";
import "./Calendar.css";
import { useCalendar, useEvent, Event } from "./hooks";

const Calendar: React.FC = () => {
  const { currentDate, setCurrentDate, days } = useCalendar(new Date());
  const {
    events,
    setEvents,
    showModal,
    setShowModal,
    selectedDate,
    setSelectedDate,
    eventDesc,
    setEventDesc,
    addEvent,
    getDayClass,
    deleteEvent,
    rearrangEvent,
  } = useEvent([]);

  return (
    <div className="calendar-wrapper">
      <CalendarNav currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarHeader />
      <CalendarDays
        days={days}
        events={events}
        setEvents={setEvents}
        setShowModal={setShowModal}
        setSelectedDate={setSelectedDate}
        getDayClass={getDayClass}
      />
      <DayEvents events={events} onDelete={deleteEvent} onRearrange={rearrangEvent} />
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

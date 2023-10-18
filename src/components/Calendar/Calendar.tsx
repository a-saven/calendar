import React from "react";
import CalendarNav from "../Navigation/Navigation";
import CalendarHeader from "../Header/Header";
import CalendarDays from "../Days/Days";
import EventModal from "../EventModal/EventModal";
import DayEvents from "../DayEvents/DayEvents";
import { useEvent } from "../utils/useEvent";
import { useCalendar } from "../utils/useCalendar";
import "./Calendar.css";

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
    isEditing,
    startEditEvent,
    updateEvent,
  } = useEvent([], currentDate);

  return (
    <div className="calendar-wrapper" data-testid="calendar-wrapper">
      <CalendarNav currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarHeader />
      <CalendarDays
        days={days}
        events={events}
        setEvents={setEvents}
        setSelectedDate={setSelectedDate}
        getDayClass={(day) => getDayClass(day, selectedDate)}
      />
      <DayEvents
        currentDate={currentDate}
        selectedDate={selectedDate}
        events={events}
        onDelete={deleteEvent}
        onRearrange={rearrangEvent}
        onEdit={startEditEvent} // Changed from editEvent to startEditEvent
        setShowModal={setShowModal}
      />
      <EventModal
        showModal={showModal}
        selectedDate={selectedDate}
        eventDesc={eventDesc}
        setEventDesc={setEventDesc}
        setShowModal={setShowModal}
        addEvent={addEvent}
        editEvent={updateEvent}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Calendar;

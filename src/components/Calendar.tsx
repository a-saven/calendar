import React, { useState } from "react";
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
  } = useEvent([], currentDate);

  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);

  const editEvent = (event: Event) => {
    setIsEditing(true);
    setSelectedDate(event.date);
    setEventDesc(event.description);
    setShowModal(true);
    setEditedEvent(event);
  };

  const updateEvent = () => {
    if (editedEvent) {
      setEvents(events.map((e) => (e.id === editedEvent.id ? { ...editedEvent, description: eventDesc } : e)));
      setIsEditing(false);
      setShowModal(false);
    }
  };

  return (
    <div className="calendar-wrapper">
      <CalendarNav currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarHeader />
      <CalendarDays
        days={days}
        events={events}
        setEvents={setEvents}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        getDayClass={(day) => getDayClass(day, selectedDate)}
      />
      <DayEvents
        currentDate={currentDate}
        selectedDate={selectedDate}
        events={events}
        onDelete={deleteEvent}
        onRearrange={rearrangEvent}
        onEdit={editEvent}
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

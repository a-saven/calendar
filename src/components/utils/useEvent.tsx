import { useReducer } from "react";
import { isToday } from "date-fns";
import { Event, UseEventReturn } from "./EventTypes";
import { reducer } from "./EventReducer";


export const useEvent = (initialEvents: Event[], currentDate: Date): UseEventReturn => {
  const [state, dispatch] = useReducer(reducer, {
    events: initialEvents,
    showModal: false,
    selectedDate: currentDate,
    eventDesc: "",
    isEditing: false,
    editedEvent: null,
  });

  const hasEvent = (date: Date): boolean =>
    state.events.some((event) => event.date.toDateString() === date.toDateString());

  const startEditEvent = (event: Event) => {
    dispatch({ type: "START_EDIT", payload: event });
  };

  const updateEvent = () => {
    dispatch({ type: "UPDATE_EVENT" });
  };

  const addEvent = () => {
    dispatch({ type: "ADD_EVENT" });
  };

  const setEvents = (newEvents: Event[]) => {
    dispatch({ type: "SET_EVENTS", payload: newEvents });
  };

  const deleteEvent = (id: string) => {
    dispatch({ type: "DELETE_EVENT", payload: id });
  };

  const rearrangeEvents = (newOrderEvents: Event[]) => {
    dispatch({ type: "REARRANGE_EVENTS", payload: newOrderEvents });
  };

  const editEvent = (updatedEvent: Event) => {
    dispatch({ type: "EDIT_EVENT", payload: updatedEvent });
  };

  const setShowModal = (flag: boolean) => {
    dispatch({ type: "TOGGLE_MODAL", payload: flag });
  };

  const setSelectedDate = (date: Date | null) => {
    dispatch({ type: "SET_SELECTED_DATE", payload: date });
  };

  const setEventDesc = (desc: string) => {
    dispatch({ type: "SET_EVENT_DESC", payload: desc });
  };

  const getDayClass = (day: Date, selectedDate: Date | null): string => {
    let classes = "";
    const isTodayDate = isToday(day);

    if (isTodayDate && hasEvent(day)) classes += " today-event";
    else if (isTodayDate) classes += " today";
    else if (hasEvent(day)) classes += " event";

    if (selectedDate && selectedDate.toDateString() === day.toDateString()) classes += " selected";

    return classes.trim();
  };

  return {
    ...state,
    hasEvent,
    addEvent,
    getDayClass,
    deleteEvent,
    rearrangeEvents,
    editEvent,
    setEvents,
    setShowModal,
    setSelectedDate,
    setEventDesc,
    startEditEvent,
    updateEvent,
  };
};

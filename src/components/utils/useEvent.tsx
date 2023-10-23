import { useReducer } from "react";
import { isToday } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export interface Event {
  id: string;
  date: Date;
  description: string;
}

interface UseEventReturn extends State {
  hasEvent: (date: Date) => boolean;
  addEvent: () => void;
  getDayClass: (day: Date, selectedDate: Date | null) => string;
  deleteEvent: (id: string) => void;
  rearrangeEvents: (newOrderEvents: Event[]) => void;
  editEvent: (updatedEvent: Event) => void;
  startEditEvent: (event: Event) => void;
  updateEvent: () => void;
  setEvents: (newEvents: Event[]) => void;
  setShowModal: (flag: boolean) => void;
  setSelectedDate: (date: Date | null) => void;
  setEventDesc: (desc: string) => void;
}

interface State {
  events: Event[];
  showModal: boolean;
  selectedDate: Date | null;
  eventDesc: string;
  isEditing: boolean;
  editedEvent: Event | null;
}

type Action =
  | { type: "SET_EVENTS"; payload: Event[] }
  | { type: "TOGGLE_MODAL"; payload: boolean }
  | { type: "SET_SELECTED_DATE"; payload: Date | null }
  | { type: "SET_EVENT_DESC"; payload: string }
  | { type: "START_EDIT"; payload: Event }
  | { type: "UPDATE_EVENT" }
  | { type: "ADD_EVENT" }
  | { type: "EDIT_EVENT"; payload: Event }
  | { type: "DELETE_EVENT"; payload: string }
  | { type: "REARRANGE_EVENTS"; payload: Event[] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EVENTS":
      return { ...state, events: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, showModal: action.payload };
    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: action.payload };
    case "SET_EVENT_DESC":
      return { ...state, eventDesc: action.payload };
    case "START_EDIT":
      return {
        ...state,
        isEditing: true,
        selectedDate: action.payload.date,
        eventDesc: action.payload.description,
        showModal: true,
        editedEvent: action.payload,
      };
    case "UPDATE_EVENT":
      if (!state.editedEvent) return state;
      return {
        ...state,
        events: state.events.map((e) => (e.id === state.editedEvent?.id ? { ...e, description: state.eventDesc } : e)),
        isEditing: false,
        showModal: false,
      };
    case "ADD_EVENT":
      if (!state.selectedDate) return state;
      const newEvent: Event = {
        id: uuidv4(),
        date: state.selectedDate,
        description: state.eventDesc,
      };
      return { ...state, events: [...state.events, newEvent], showModal: false, eventDesc: "" };
    case "EDIT_EVENT":
      const newEvents = state.events.map((event) => (event.id === action.payload.id ? action.payload : event));
      return { ...state, events: newEvents };
    case "DELETE_EVENT":
      return { ...state, events: state.events.filter((event) => event.id !== action.payload) };
    case "REARRANGE_EVENTS":
      return { ...state, events: action.payload };
    default:
      return state;
  }
};

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

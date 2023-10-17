import { useEffect, useReducer } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export interface Event {
  id: string;
  date: Date;
  description: string;
}

interface State {
  currentDate: Date;
  days: Date[];
  events: Event[];
  showModal: boolean;
  selectedDate: Date | null;
  eventDesc: string;
}

type Action =
  | { type: "SET_CURRENT_DATE"; payload: Date }
  | { type: "INIT_DAYS" }
  | { type: "ADD_EVENT" }
  | { type: "EDIT_EVENT"; payload: Event }
  | { type: "DELETE_EVENT"; payload: string }
  | { type: "SHOW_MODAL"; payload: boolean }
  | { type: "SET_SELECTED_DATE"; payload: Date | null }
  | { type: "SET_EVENT_DESC"; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CURRENT_DATE":
      return { ...state, currentDate: action.payload };
    case "INIT_DAYS":
      const start = startOfMonth(state.currentDate);
      const end = endOfMonth(state.currentDate);
      const days = eachDayOfInterval({ start, end });
      return { ...state, days };
    case "ADD_EVENT":
      const newEvent = { id: uuidv4(), date: state.selectedDate!, description: state.eventDesc };
      return { ...state, events: [...state.events, newEvent], showModal: false, eventDesc: "" };
    case "EDIT_EVENT":
      return {
        ...state,
        events: state.events.map((event) => (event.id === action.payload.id ? action.payload : event)),
      };
    case "DELETE_EVENT":
      return { ...state, events: state.events.filter((event) => event.id !== action.payload) };
    case "SHOW_MODAL":
      return { ...state, showModal: action.payload };
    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: action.payload };
    case "SET_EVENT_DESC":
      return { ...state, eventDesc: action.payload };
    default:
      return state;
  }
};

export const useCalendarEvent = (initialState: State) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "INIT_DAYS" });
  }, [state.currentDate]);

  return [state, dispatch] as const;
};

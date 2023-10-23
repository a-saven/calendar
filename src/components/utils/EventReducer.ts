import { State, Action, Event } from "./EventTypes";
import { v4 as uuidv4 } from "uuid";

export const reducer = (state: State, action: Action): State => {
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

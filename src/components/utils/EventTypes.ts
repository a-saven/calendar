export interface Event {
  id: string;
  date: Date;
  description: string;
}

export interface UseEventReturn extends State {
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

export interface State {
  events: Event[];
  showModal: boolean;
  selectedDate: Date | null;
  eventDesc: string;
  isEditing: boolean;
  editedEvent: Event | null;
}

export type Action =
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

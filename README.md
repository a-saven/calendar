# Calendar App

- Can navigate between months
- Can add and events of any day
- Show events on the calendar ( blue -today, green - event today, orange - event not today),
- Can rearrange and delete events of the day
- Pure React & CSS
- As requested library used for animation
- Test covergae


Application is a calendar-based event management system, built using React and TypeScript. Here are the aspects broken down:

1. **High-Level Design**:
    - The application is organized into various components, each responsible for a part of the UI or a specific functionality.
    - There are utility hooks (`useEvent` and `useCalendar`) which encapsulate business logic and state management for events and calendar data respectively.
    - Data flows from these utility hooks down to the components via props, and actions flow back up via callback props.
    - `react` and `date-fns` libraries are used for building UI and handling date operations respectively.

2. **Functional Components**:
    - All components are functional components utilizing React hooks for managing side-effects (`useEffect`), memoization (`useMemo`, `useCallback`), and state (`useState`, `useReducer`).
    - Examples of functional components include `CalendarNav`, `CalendarHeader`, `CalendarDays`, `DayEvents`, `EventModal`, and the main `Calendar` component.

3. **Main Interfaces & APIs**:
    - **Interfaces**:
        - `Event`: Represents an event with `id`, `date`, and `description`.
        - `UseEventReturn`: Extends `State` and provides several function types like `hasEvent`, `addEvent`, etc.
        - `State`: Holds the state of the event system.
        - `Action`: Enumerates the actions that can be performed on the state.
        - `UseCalendarReturn`: Holds the state and functions related to the calendar system.
    - **APIs**:
        - `addEventKV`, `getEventsKV`, `editEventKV`, `deleteEventKV`: These are presumably asynchronous functions interacting with a backend or external service to manage event data.

4. **Business Logic**:
    - The business logic is encapsulated within `useEvent` and `useCalendar` hooks and the `reducer` function.
    - `useEvent` manages the state and actions related to events, like adding, editing, deleting, or rearranging events.
    - `useCalendar` manages the state related to the current date and the days in the current month.
    - The `reducer` function defines how the state changes in response to various actions, following the Redux pattern.

5. **Data Model**:
    - The primary data model is the `Event` interface, which represents an event in the system.
    - The state in `useEvent` and `useCalendar` hooks holds the current state of the system, including the list of events, the current date, and other UI-related states.
    - The data model is manipulated through actions dispatched to the `reducer`, which in turn update the state based on the action type and payload.

The structure and organization of code adhere to modern React best practices, making use of functional components, hooks, and a clear separation of concerns between UI, state management, and business logic.
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CalendarDays from "./Days"; // Adjust the import to your folder structure

describe("CalendarDays", () => {
  const mockSetSelectedDate = jest.fn();
  const mockGetDayClass = jest.fn().mockReturnValue("someClass");

  const mockDays = [new Date("2023-10-01"), new Date("2023-10-02"), new Date("2023-10-03")];

  const baseProps = {
    days: mockDays,
    getDayClass: mockGetDayClass,
    setSelectedDate: mockSetSelectedDate,
    selectedDate: null,
    events: [],
    setEvents: jest.fn(),
  };

  test("renders days correctly", () => {
    render(<CalendarDays {...baseProps} />);
    mockDays.forEach((day) => {
      expect(screen.getByText(day.getDate().toString())).toBeInTheDocument();
    });
  });

  test("calls setSelectedDate when day clicked", () => {
    render(<CalendarDays {...baseProps} />);
    fireEvent.click(screen.getByText("1"));
    expect(mockSetSelectedDate).toHaveBeenCalledWith(mockDays[0]);
  });

  test("applies classes correctly", () => {
    render(<CalendarDays {...baseProps} />);
    mockDays.forEach((day) => {
      const dayElement = screen.getByText(day.getDate().toString());
      expect(dayElement).toHaveClass("calendar-day");
    });
  });
});

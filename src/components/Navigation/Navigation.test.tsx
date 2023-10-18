import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CalendarNav from "./Navigation"; // Adjust the import to your folder structure
import { format, addMonths, subMonths } from "date-fns";

describe("CalendarNav", () => {
  const currentDate = new Date(2023, 9, 17); // Oct 17, 2023
  const setCurrentDate = jest.fn();

  test("renders correctly", () => {
    render(<CalendarNav currentDate={currentDate} setCurrentDate={setCurrentDate} />);
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText(format(currentDate, "MMMM yyyy"))).toBeInTheDocument();
  });

  test("goes to the previous month", () => {
    render(<CalendarNav currentDate={currentDate} setCurrentDate={setCurrentDate} />);
    fireEvent.click(screen.getByText("<"));
    expect(setCurrentDate).toHaveBeenCalledWith(expect.any(Function));
    const prevDate = setCurrentDate.mock.calls[0][0](currentDate);
    expect(prevDate).toEqual(subMonths(currentDate, 1));
  });

  test("goes to the next month", () => {
    render(<CalendarNav currentDate={currentDate} setCurrentDate={setCurrentDate} />);
    fireEvent.click(screen.getByText(">"));
    expect(setCurrentDate).toHaveBeenCalledWith(expect.any(Function));
    const nextDate = setCurrentDate.mock.calls[0][0](currentDate);
    expect(nextDate).toEqual(addMonths(currentDate, 1));
  });
});

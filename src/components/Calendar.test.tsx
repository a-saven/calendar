import { render, screen, fireEvent } from "@testing-library/react";
import Calendar from "./Calendar";
import { format, subMonths } from "date-fns";

describe("Calendar Component", () => {
  test("renders and navigates between months", () => {
    render(<Calendar />);

    // Check if current month is displayed
    expect(screen.getByText(format(new Date(), "MMMM yyyy"))).toBeInTheDocument();

    const prevButton = screen.getByText("<");
    const nextButton = screen.getByText(">");

    // Navigate to previous month
    fireEvent.click(prevButton);
    expect(screen.getByText(format(subMonths(new Date(), 1), "MMMM yyyy"))).toBeInTheDocument();

    // Navigate to next month
    fireEvent.click(nextButton);
    expect(screen.getByText(format(new Date(), "MMMM yyyy"))).toBeInTheDocument();
  });

  test("today's date has correct style", () => {
    render(<Calendar />);

    const today = format(new Date(), "d");
    const todayElement = screen.getByText(today, { selector: ".calendar-day" });
    expect(todayElement).toHaveClass("today");
  });

//   test("can add an event", () => {
//     render(<Calendar />);

//     const someDay = format(new Date(), "d");
//     fireEvent.click(screen.getByText(someDay));

//     const eventInput = screen.getByRole("textbox");
//     fireEvent.change(eventInput, { target: { value: "Meeting" } });

//     fireEvent.click(screen.getByText("Add"));
//     expect(screen.getByText("Meeting")).toBeInTheDocument();
//   });

  test("can close event modal without adding", () => {
    render(<Calendar />);

    const someDay = format(new Date(), "d");
    fireEvent.click(screen.getByText(someDay));

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  // Add more tests as needed, like checking if days before the 1st and after the last day of the month are empty.
});

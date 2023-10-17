import { render, fireEvent, screen } from "@testing-library/react";
import DayEvents from "./DayEvents"; // Adjust import to your folder structure

describe("DayEvents", () => {
  const mockOnDelete = jest.fn();
  const mockOnRearrange = jest.fn();
  const mockOnEdit = jest.fn();
  const mockSetShowModal = jest.fn();

  const mockEvents = [
    { id: "1", date: new Date("2023-10-17"), description: "Event 1" },
    { id: "2", date: new Date("2023-10-17"), description: "Event 2" },
  ];

  const baseProps = {
    events: mockEvents,
    currentDate: new Date("2023-10-17"),
    selectedDate: new Date("2023-10-17"),
    onDelete: mockOnDelete,
    onEdit: mockOnEdit,
    onRearrange: mockOnRearrange,
    setShowModal: mockSetShowModal,
  };

  test("renders events correctly", () => {
    render(<DayEvents {...baseProps} />);
    mockEvents.forEach((event) => {
      expect(screen.getByText(event.description)).toBeInTheDocument();
    });
  });

  test("calls onDelete when delete button clicked", () => {
    render(<DayEvents {...baseProps} />);
    fireEvent.click(screen.getAllByText("❌")[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(mockEvents[0].id);
  });

  test("calls onEdit when edit button clicked", () => {
    render(<DayEvents {...baseProps} />);
    fireEvent.click(screen.getAllByText("✏️")[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockEvents[0]);
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Calendar from "./Calendar";

describe("Calendar Component", () => {
  test("renders without crashing", () => {
    render(<Calendar />);
    expect(screen.getByTestId("calendar-wrapper")).toBeInTheDocument();
  });
});

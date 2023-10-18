import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarHeader from "./Header"; // Adjust the import to your folder structure

describe("CalendarHeader", () => {
  test("renders day labels correctly and in sequence", () => {
    render(<CalendarHeader />);
    const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
    const renderedLabels = screen.getAllByText(/[SMTWF]/);

    expect(renderedLabels).toHaveLength(dayLabels.length);

    renderedLabels.forEach((element, index) => {
      expect(element.textContent).toEqual(dayLabels[index]);
    });
  });
});

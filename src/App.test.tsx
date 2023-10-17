import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders Calendar", () => {
  render(<App />);
  const linkElement = screen.getByText(/Calendar/i);
  expect(linkElement).toBeInTheDocument();
});

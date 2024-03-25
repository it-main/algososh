import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./app";

test("renders algososh", () => {
  render(<App />);
  const element = screen.getByText(/сделано в практикуме/i);
  expect(element).toBeInTheDocument();
});

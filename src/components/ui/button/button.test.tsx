import { screen, render } from "@testing-library/react";
import { Button } from "./button";

describe("testing Button component", () => {
  it("Buttons with caption renders correctly", () => {
    render(<Button text="Развернуть" />);
    expect(screen.getByRole("button")).toHaveTextContent("Развернуть");
    expect(screen.getByRole("button")).toBeInTheDocument();
    screen.debug();
  });
});

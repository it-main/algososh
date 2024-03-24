import { render } from "@testing-library/react";
import { Button } from "./button";

describe("testing button component", () => {
  it("should render button", () => {
    const elem = render(<Button text="Развернуть" />);
  });
});

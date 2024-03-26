import { render } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Тестирование компонента Circle", () => {
  it("без буквы рендерится корректно", () => {
    const { asFragment } = render(<Circle />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("c буквой рендерится корректно", () => {
    const { asFragment } = render(<Circle letter="12" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("c head рендерится корректно", () => {
    const { asFragment } = render(<Circle head="12" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("c реакт-элементом в head рендерится корректно", () => {
    const { asFragment } = render(<Circle head={<Circle />} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("c tail рендерится корректно", () => {
    const { asFragment } = render(<Circle tail="tail" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("c index рендерится корректно", () => {
    const { asFragment } = render(<Circle index={15} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("c isSmall===true рендерится корректно", () => {
    const { asFragment } = render(<Circle isSmall />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("c state===Default рендерится корректно", () => {
    const { asFragment } = render(<Circle state={ElementStates.Default} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("c state===Changing рендерится корректно", () => {
    const { asFragment } = render(<Circle state={ElementStates.Changing} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("c state===Modified рендерится корректно", () => {
    const { asFragment } = render(<Circle state={ElementStates.Modified} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

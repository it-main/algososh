import { render, screen } from "@testing-library/react";
import { Button } from "./button";
import userEvent from "@testing-library/user-event";

const onClick = jest.fn();

describe("Тестирование компонента Button", () => {
  it("Кнопка с текстом рендерится корректно", () => {
    const { asFragment } = render(<Button text="Развернуть" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Кнопка без текста рендерится корректно", () => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Заблокированная кнопка рендерится корректно", () => {
    const { asFragment } = render(<Button text="Развернуть" disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Кнопка с индикацией загрузки рендерится корректно", () => {
    const { asFragment } = render(<Button text="Развернуть" isLoader />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Колбек вызывается корректно", () => {
    render(<Button text="Развернуть" onClick={onClick} />);
    userEvent.click(screen.getByRole("button"));
    expect(onClick).toBeCalled();
  });
});

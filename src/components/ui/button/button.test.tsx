import { render } from "@testing-library/react";
import { Button } from "./button";
// import renderer from "react-test-renderer";

describe("Тестирование компонента Button", () => {
  it("Компонент с надписью рендерится корректно", () => {
    const { asFragment } = render(<Button text="Развернуть" />);
    expect(asFragment()).toMatchSnapshot();

    // const tree = renderer
    //   .create(<Link page="http://www.facebook.com">Facebook</Link>)
    //   .toJSON();
    // expect(tree).toMatchSnapshot();
  });
});

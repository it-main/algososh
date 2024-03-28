import { getSteps } from "./utils";

describe("Тестирование алгоритма разворота строки", () => {
  it("с чётным количеством символов", () => {
    const steps = getSteps("1234");
    const lastStep = steps[steps.length - 1].map((elem) => elem.item).join("");
    expect(lastStep).toEqual("4321");
  });
  it("с нечётным количеством символов", () => {
    const steps = getSteps("12345");
    const lastStep = steps[steps.length - 1].map((elem) => elem.item).join("");
    expect(lastStep).toEqual("54321");
  });
  it("с одним символом", () => {
    const steps = getSteps("1");
    const lastStep = steps[steps.length - 1].map((elem) => elem.item).join("");
    expect(lastStep).toEqual("1");
  });
  it("с пустой строкой", () => {
    const steps = getSteps("");
    const lastStep = steps.length
      ? steps[steps.length - 1].map((elem) => elem.item).join("")
      : "";
    expect(lastStep).toEqual("");
  });
});

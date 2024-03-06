import { ElementStates } from "../../types/element-states";

export type ArrayItem = {
  value: number;
  state: ElementStates;
};

export const method = {
  selection: "selection",
  bubble: "bubble",
};

export function getArray(minLength: number, maxLength: number, maxNum: number) {
  const array = [];
  const randomLength = Math.trunc(
    Math.random() * (maxLength - minLength + 1) + minLength,
  );
  for (let i = 0; i < randomLength; i++) {
    array.push({
      value: Math.floor(Math.random() * maxNum + 1),
      state: ElementStates.Default,
    });
  }
  return array;
}

export const swap = (
  arr: ArrayItem[],
  firstIndex: number,
  secondIndex: number,
) => {
  const tmp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = tmp;
};

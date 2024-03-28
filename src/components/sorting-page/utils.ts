import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

export type ArrayItem = {
  value: number;
  state: ElementStates;
};

const MIN_LENGTH = 3;
const MAX_LENGTH = 17;
const MAX_NUM = 100;

export const method = {
  selection: "selection",
  bubble: "bubble",
};

export function getArray(
  minLength = MIN_LENGTH,
  maxLength = MAX_LENGTH,
  maxNum = MAX_NUM,
) {
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

export function getStepsSelectionMethod(
  array: ArrayItem[],
  direction: Direction,
): ArrayItem[][] {
  let steps: ArrayItem[][] = [];
  steps.push([...array]);
  console.log(steps);
  // for (let i = 0; i < array.length; i++) {
  //   let maxInd = i;
  //   array[maxInd].state = ElementStates.Changing;
  //   steps.push([...array]);
  //   for (let j = i + 1; j < array.length; j++) {
  //     array[j].state = ElementStates.Changing;
  //     //setArray([...array]);
  //     steps.push([...array]);
  //     // await delay(SHORT_DELAY_IN_MS);
  //     if (
  //       (direction === Direction.Ascending &&
  //         array[j].value < array[maxInd].value) ||
  //       (direction === Direction.Descending &&
  //         array[j].value > array[maxInd].value)
  //     ) {
  //       maxInd = j;
  //       array[j].state = ElementStates.Changing;
  //       if (maxInd === i) {
  //         array[maxInd].state = ElementStates.Changing;
  //       } else {
  //         array[maxInd].state = ElementStates.Default;
  //       }
  //     }
  //     if (maxInd !== j) {
  //       array[j].state = ElementStates.Default;
  //     }
  //     // setArray([...array]);
  //     steps.push([...array]);
  //   }
  //   if (maxInd !== i) swap(array, maxInd, i);
  //   array[maxInd].state = ElementStates.Default;
  //   // array[i].state = ElementStates.Modified;
  //   // setArray([...array]);
  //   steps.push([...array]);
  // }
  return steps;
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

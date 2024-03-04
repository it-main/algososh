import { ElementStates } from "../../types/element-states";

export type StepData = {
  item: string;
  state: ElementStates;
};

export function setStateElements(
  items: StepData[],
  index: number,
  pairIndex: number,
  state: ElementStates,
) {
  items[index].state = state;
  items[pairIndex].state = state;
}

function getStep(
  stepsData: StepData[][],
  stepData: StepData[],
  startIndex = 0,
  endIndex = stepData.length - 1,
) {
  if (startIndex >= endIndex) {
    stepData[startIndex].state = ElementStates.Modified;
    stepData[endIndex].state = ElementStates.Modified;
    stepsData.push(stepData.map((item) => ({ ...item })));
    return;
  } else {
    stepData[startIndex].state = ElementStates.Changing;
    stepData[endIndex].state = ElementStates.Changing;
    stepsData.push(stepData.map((item) => ({ ...item })));
  }

  const tmp = stepData[startIndex].item;
  stepData[startIndex].item = stepData[endIndex].item;
  stepData[endIndex].item = tmp;
  stepData[startIndex].state = ElementStates.Modified;
  stepData[endIndex].state = ElementStates.Modified;
  startIndex++;
  endIndex--;
  getStep(stepsData, stepData, startIndex, endIndex);
}

export function getSteps(source: string): StepData[][] {
  let stepData = Array.from(source).map((item) => ({
    item,
    state: ElementStates.Default,
  }));
  const stepsData: StepData[][] = [];
  getStep(stepsData, stepData);
  return stepsData;
}

import { linkedList } from "./class-linked-list";
import { ElementStates } from "../../types/element-states";

export type TItem = {
  value: string;
  state: ElementStates;
};

export type TModifyItem = {
  value: string;
  index: number;
  type: "head" | "tail";
};
export enum Process {
  AddToHead,
  AddToTail,
  AddByIndex,
  RemoveFromHead,
  RemoveFromTail,
  RemoveByIndex,
}
export function getModifyItem(
  value: string,
  index: number,
  type: "head" | "tail" = "head",
): TModifyItem {
  return {
    value,
    index,
    type,
  };
}

export function getList() {
  return linkedList.toArray().map((item) => {
    return {
      value: item,
      state: ElementStates.Default,
    };
  });
}

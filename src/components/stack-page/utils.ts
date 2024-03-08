import { Stack } from "./class-stack";

export enum Process {
  Add,
  Remove,
  Clear,
}
export const stack = new Stack<string>();

import { Queue } from "./class-queue";

const MAX_QUEUE_SIZE = 7;
export enum Process {
  Add,
  Remove,
  Clear,
}
export const queue = new Queue<string>(MAX_QUEUE_SIZE);

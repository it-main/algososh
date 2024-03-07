interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => number;
  getSize: () => number;
  clear: () => void;
  getStack: () => T[];
}

export class Stack<T> implements IStack<T> {
  private stack: T[] = [];

  push = (item: T) => {
    this.stack.push(item);
  };

  pop = () => {
    this.stack.pop();
  };

  peak = () => {
    return this.getSize() - 1;
  };

  clear = () => {
    this.stack = [];
  };

  getStack = () => this.stack;

  getSize = () => this.stack.length;
}

export const stack = new Stack<string>();

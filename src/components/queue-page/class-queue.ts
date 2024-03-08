interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  isEmpty: () => boolean;
  getQueue: () => Array<T | null>;
  getTail: () => number;
  getSize: () => number;
  getHead: () => number;
}
export class Queue<T> implements IQueue<T> {
  private queue: (T | null)[] = [];
  private head = 0;
  private tail = -1;

  private readonly size: number = 0;
  private length = 0;

  constructor(size: number) {
    this.size = size;
    this.queue = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.tail = this.tail + 1;
    this.queue[this.tail] = item;
    this.length = this.length + 1;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.queue[this.head] = null;
    this.head = this.isEmpty() ? (this.head = 0) : this.head + 1;
    this.length = this.length - 1;
    if (this.isEmpty()) this.tail = -1;
  };

  clear = () => {
    this.queue = Array(this.size);
    this.tail = -1;
    this.length = 0;
    this.head = 0;
  };

  isEmpty = () =>
    !this.queue.some((item) => {
      return item !== null;
    });

  getQueue = () => this.queue;

  getTail = () => this.tail;

  getSize = () => this.size;

  getHead = () => this.head;
}

import { getArray } from "../../utils/utils";

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

type TLinkedList<T> = {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
};

class LinkedList<T> implements TLinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(elements: T[]) {
    this.head = null;
    this.size = 0;
    elements.forEach((item) => {
      this.append(item);
    });
  }

  append(element: T) {
    const node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    }
    const node = new Node(element);
    // добавить элемент в начало списка
    if (index === 0) {
      node.next = this?.head ? this.head : null;
      this.head = node;
    } else {
      let curr = this.head;
      let currIndex = 0;
      let prev = null;

      // перебрать элементы в списке до нужной позиции
      while (currIndex < index) {
        if (curr?.next) {
          prev = curr;
          curr = curr.next;
        }
        currIndex = currIndex + 1;
      }
      // добавить элемент
      if (prev?.next) {
        prev.next = node;
        node.next = curr;
      }
    }
    this.size++;
  }

  removeAt(index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    }

    if (index === 0) {
      this.head = this.head?.next ? this.head.next : null;
    } else if (index === this.size - 1) {
      let curr = this.head;
      let prev = null;
      let currIndex = 0;

      while (currIndex < index) {
        if (curr?.next) {
          prev = curr;
          curr = curr.next;
        }
        currIndex = currIndex + 1;
      }
      if (prev?.next) {
        prev.next = null;
      }
    } else {
      let curr = this.head;
      let currIndex = 0;
      let prev = null;

      while (currIndex < index) {
        if (curr?.next) {
          prev = curr;
          curr = curr.next;
        }
        currIndex = currIndex + 1;
      }
      if (prev?.next) {
        prev.next = curr?.next ? curr.next : null;
      }
    }
    this.size--;
  }

  getSize() {
    return this.size;
  }

  toArray() {
    let curr = this.head;
    let array = [];
    while (curr) {
      array.push(curr.value);
      curr = curr.next;
    }
    return [...array];
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}

export const linkedList = new LinkedList<string>(getArray(4, 4, 100));

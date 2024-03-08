import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { queue } from "./utils";

export const QueuePage: React.FC = () => {
  enum Process {
    Add,
    Remove,
    Clear,
  }
  const [source, setSource] = useState<string>("");
  const [currentQueue, setCurrentQueue] = useState<Array<string | null>>([
    ...queue.getQueue(),
  ]);
  const [currentItem, setCurrentItem] = useState<number>(-1);
  const [isLoader, setIsLoader] = useState<Process | undefined>();

  const handleSetSource = (event: ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
  };

  function handleAddToQueue() {
    setCurrentItem(queue.getTail() + 1);
    setIsLoader(Process.Add);
    setTimeout(() => {
      queue.enqueue(source);
      setCurrentQueue([...queue.getQueue()]);
      setSource("");
      setCurrentItem(-1);
      setIsLoader(undefined);
    }, SHORT_DELAY_IN_MS);
  }

  function handleRemoveFromQueue() {
    setCurrentItem(queue.getHead);
    setIsLoader(Process.Remove);
    setTimeout(() => {
      queue.dequeue();
      setCurrentQueue([...queue.getQueue()]);
      setCurrentItem(-1);
      setIsLoader(undefined);
    }, SHORT_DELAY_IN_MS);
  }

  function handleClearQueue() {
    queue.clear();
    setIsLoader(Process.Clear);
    setCurrentQueue(queue.getQueue());
    setTimeout(() => {
      setCurrentQueue([...queue.getQueue()]);
      setIsLoader(undefined);
    }, SHORT_DELAY_IN_MS);
  }

  function stateStackElement(index: number) {
    return index === currentItem
      ? ElementStates.Changing
      : ElementStates.Default;
  }

  function isHead(index: number) {
    return queue.getHead() === index && !queue.isEmpty() ? "head" : "";
  }

  function isTail(index: number) {
    return queue.getTail() === index && !queue.isEmpty() ? "tail" : "";
  }

  function getStateAddButton() {
    return (
      queue.getTail() >= queue.getSize() - 1 ||
      !Boolean(source) ||
      (isLoader !== undefined && isLoader !== Process.Add)
    );
  }
  function getStateRemoveButton() {
    return (
      queue.isEmpty() || (isLoader !== undefined && isLoader !== Process.Remove)
    );
  }
  function getStateClearButton() {
    return (
      queue.isEmpty() || (isLoader !== undefined && isLoader !== Process.Clear)
    );
  }
  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form}>
        <div className={styles.controls}>
          <Input
            autoFocus
            value={source}
            placeholder={"Введите значение"}
            onChange={handleSetSource}
            maxLength={4}
            isLimitText
            extraClass={styles.source}
          />
          <Button
            text={"Добавить"}
            disabled={getStateAddButton()}
            onClick={handleAddToQueue}
            isLoader={isLoader === Process.Add}
          />
          <Button
            text={"Удалить"}
            disabled={getStateRemoveButton()}
            onClick={handleRemoveFromQueue}
            isLoader={isLoader === Process.Remove}
          />
        </div>
        <Button
          text={"Очистить"}
          disabled={getStateClearButton()}
          onClick={handleClearQueue}
        />
      </form>
      <div className={styles.dataStructure}>
        {currentQueue.map((item: string | null, index: number) => (
          <Circle
            letter={item === null ? "" : item}
            key={index}
            index={index}
            head={isHead(index)}
            tail={isTail(index)}
            state={stateStackElement(index)}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};

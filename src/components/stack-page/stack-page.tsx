import React, { ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Process, stack } from "./utils";

export const StackPage: React.FC = () => {
  const [source, setSource] = React.useState<string>("");
  const [currentStack, setCurrentStack] = React.useState<string[]>([]);
  const [currentItem, setCurrentItem] = React.useState<number>(stack.peak());
  const [isLoader, setIsLoader] = React.useState<Process | undefined>();
  const handleSetSource = (event: ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
  };

  function handleAddToStack() {
    stack.push(source);
    setCurrentStack([...stack.getStack()]);
    setSource("");
    setCurrentItem(stack.peak());
    setIsLoader(Process.Add);
    setTimeout(() => {
      setCurrentItem(-1);
      setIsLoader(undefined);
    }, SHORT_DELAY_IN_MS);
  }

  function handleRemoveFromStack() {
    setCurrentItem(stack.peak());
    setIsLoader(Process.Remove);
    setTimeout(() => {
      stack.pop();
      setCurrentStack([...stack.getStack()]);
      setCurrentItem(-1);
      setIsLoader(undefined);
    }, SHORT_DELAY_IN_MS);
  }

  function handleClearStack() {
    stack.clear();
    setCurrentStack(stack.getStack());
    setIsLoader(Process.Clear);
    setTimeout(() => {
      setIsLoader(undefined);
    }, SHORT_DELAY_IN_MS);
  }

  function stateStackElement(index: number) {
    return index === currentItem
      ? ElementStates.Changing
      : ElementStates.Default;
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <div className={styles.controls}>
          <Input
            autoFocus
            value={source}
            onChange={handleSetSource}
            maxLength={4}
            isLimitText
            extraClass={styles.source}
          />
          <Button
            text={"Добавить"}
            disabled={!Boolean(source) || isLoader === Process.Remove}
            onClick={handleAddToStack}
            isLoader={isLoader === Process.Add}
          />
          <Button
            text={"Удалить"}
            disabled={!Boolean(stack.getSize()) || isLoader === Process.Add}
            onClick={handleRemoveFromStack}
            isLoader={isLoader === Process.Remove}
          />
        </div>
        <Button
          text={"Очистить"}
          disabled={!Boolean(stack.getSize()) || isLoader !== undefined}
          onClick={handleClearStack}
        />
      </form>
      <div className={styles.dataStructure}>
        {currentStack.map((item: string, index: number) => (
          <Circle
            letter={item}
            key={index}
            index={index}
            head={stack.peak() === index ? "top" : ""}
            state={stateStackElement(index)}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};

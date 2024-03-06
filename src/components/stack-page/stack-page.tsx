import React, { ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  enum Process {
    Add,
    Remove,
    Clear,
  }
  const [source, setSource] = React.useState<string>("");
  const [stack, setStack] = React.useState<string[]>([]);
  const [currentItem, setCurrentItem] = React.useState<number>(-1);
  const [isLoader, setIsLoader] = React.useState<Process | undefined>();
  const handleSetSource = (event: ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
  };

  function handleAddToStack() {
    setStack([...stack, source]);
    setSource("");
    setCurrentItem(stack.length);
    setIsLoader(Process.Add);
    setTimeout(() => {
      setCurrentItem(-1);
      setIsLoader(undefined);
    }, SHORT_DELAY_IN_MS);
  }

  function handleRemoveFromStack() {
    setCurrentItem(stack.length - 1);
    setIsLoader(Process.Remove);
    setTimeout(() => {
      setCurrentItem(-1);
      setStack([...stack.slice(0, stack.length - 1)]);
      setIsLoader(undefined);
    }, SHORT_DELAY_IN_MS);
  }

  function handleClearStack() {
    setStack([]);
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
            disabled={!Boolean(source)}
            onClick={handleAddToStack}
            isLoader={isLoader === Process.Add}
          />
          <Button
            text={"Удалить"}
            disabled={!Boolean(stack.length)}
            onClick={handleRemoveFromStack}
            isLoader={isLoader === Process.Remove}
          />
        </div>
        <Button
          text={"Очистить"}
          disabled={!Boolean(stack.length)}
          onClick={handleClearStack}
        />
      </form>
      <div className={styles.stack}>
        {stack.map((item: string, index: number) => (
          <Circle
            letter={item}
            key={index}
            index={index}
            head={stack.length - 1 === index ? "top" : ""}
            state={stateStackElement(index)}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};

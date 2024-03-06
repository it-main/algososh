import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { ArrayItem, getArray, method, swap } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";

export const SortingPage: React.FC = () => {
  const [sortingMethod, setSortingMethod] = useState(method.selection);
  const [sortingDirection, setSortingDirection] = useState<Direction>();
  const [array, setArray] = useState<ArrayItem[]>(getArray());

  function handleSetMethod(event: ChangeEvent<HTMLInputElement>) {
    setSortingMethod(event.target.value);
  }

  async function selectionSorting(direction: Direction) {
    for (let i = 0; i < array.length; i++) {
      let maxInd = i;
      array[maxInd].state = ElementStates.Changing;
      for (let j = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing;
        setArray([...array]);
        await delay(SHORT_DELAY_IN_MS);
        if (
          (direction === Direction.Ascending &&
            array[j].value < array[maxInd].value) ||
          (direction === Direction.Descending &&
            array[j].value > array[maxInd].value)
        ) {
          maxInd = j;
          array[j].state = ElementStates.Changing;
          if (maxInd === i) {
            array[maxInd].state = ElementStates.Changing;
          } else {
            array[maxInd].state = ElementStates.Default;
          }
        }
        if (maxInd !== j) {
          array[j].state = ElementStates.Default;
        }
        setArray([...array]);
      }
      if (maxInd !== i) swap(array, maxInd, i);
      array[maxInd].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setArray([...array]);
    }
  }

  async function bubbleSorting(direction: Direction) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        setArray([...array]);
        await delay(SHORT_DELAY_IN_MS);
        if (
          (direction === Direction.Ascending &&
            array[j].value > array[j + 1].value) ||
          (direction === Direction.Descending &&
            array[j].value < array[j + 1].value)
        ) {
          swap(array, j, j + 1);
        }
        array[j].state = ElementStates.Default;
        setArray([...array]);
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setArray([...array]);
    }
  }

  function handleSorting(direction: Direction) {
    setSortingDirection(direction);
    if (sortingMethod === method.selection) {
      selectionSorting(direction).finally(() => setSortingDirection(undefined));
    } else {
      bubbleSorting(direction).finally(() => setSortingDirection(undefined));
    }
  }

  function randomArr() {
    setArray(getArray());
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput
          onChange={handleSetMethod}
          name={"method"}
          value={method.selection}
          defaultChecked
          label="Выбор"
          disabled={sortingDirection !== undefined}
        />
        <RadioInput
          onChange={handleSetMethod}
          name={"method"}
          value={method.bubble}
          checked={sortingMethod === method.bubble}
          label="Пузырёк"
          disabled={sortingDirection !== undefined}
        />
        <div className={styles.buttons}>
          <Button
            onClick={() => handleSorting(Direction.Ascending)}
            sorting={Direction.Ascending}
            isLoader={sortingDirection === Direction.Ascending}
            disabled={sortingDirection === Direction.Descending}
            text={"По возрастанию"}
          />
          <Button
            onClick={() => handleSorting(Direction.Descending)}
            sorting={Direction.Descending}
            isLoader={sortingDirection === Direction.Descending}
            disabled={sortingDirection === Direction.Ascending}
            text={"По убыванию"}
          />
        </div>
        <Button
          text={"Новый массив"}
          onClick={randomArr}
          disabled={Boolean(sortingDirection)}
        />
      </form>
      <div className={styles.array}>
        {array.map((item: ArrayItem, index: number) => (
          <Column key={index} index={item.value} state={item.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};

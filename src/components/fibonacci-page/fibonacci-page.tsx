import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibbonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { getFibonacci } from "./utils";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [numbersFib, setNumbersFib] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoader(true);
    const sequence: number[] = [];
    for (let i = 0; i <= value; i++) {
      sequence.push(getFibonacci(i));
    }
    let step = 1;
    const timer = setInterval(() => {
      setNumbersFib(sequence.slice(0, step));
      step++;
      if (step > sequence.length) {
        clearInterval(timer);
        setIsLoader(false);
      }
    }, SHORT_DELAY_IN_MS);
  }

  function handleSetValue(event: ChangeEvent<HTMLInputElement>) {
    setValue(Number(event.target.value));
  }

  function isButtonDisabled() {
    return value < 1 || value > 19;
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          extraClass={styles.string}
          isLimitText
          value={value}
          type="number"
          min={1}
          max={19}
          onChange={handleSetValue}
        ></Input>
        <Button
          type="submit"
          isLoader={isLoader}
          extraClass={styles.button}
          disabled={isButtonDisabled()}
          text={"Рассчитать"}
        ></Button>
      </form>

      <div className={styles.circles}>
        {numbersFib.map((elem, index) => (
          <Circle letter={String(elem)} key={index} tail={String(index)} />
        ))}
      </div>
    </SolutionLayout>
  );
};

import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { getSteps, StepData } from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [source, setSource] = useState("");
  const [inverted, setInverted] = useState<StepData[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const handleSetString = (event: ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoader(true);
    const steps = getSteps(source);
    let step = 0;
    const timer = setInterval(() => {
      setInverted(steps[step]);
      step++;
      if (step === steps.length) {
        clearInterval(timer);
        setIsLoader(false);
      }
    }, DELAY_IN_MS);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          extraClass={styles.string}
          isLimitText={true}
          maxLength={11}
          value={source}
          onChange={handleSetString}
        ></Input>
        <Button
          type="submit"
          isLoader={isLoader}
          extraClass={styles.button}
          disabled={!Boolean(source)}
          text={"Развернуть"}
        ></Button>
      </form>

      <div className={styles.circles}>
        {inverted.map((elem, index) => (
          <Circle letter={elem.item} key={index} state={elem.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};

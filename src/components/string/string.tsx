import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  let [string, setString] = useState("");

  const handleSetString = (event: ChangeEvent<HTMLInputElement>) => {
    setString(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const length = string.length;
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          extraClass={styles.string}
          isLimitText={true}
          maxLength={11}
          value={string}
          onChange={handleSetString}
        ></Input>
        <Button
          type="submit"
          extraClass={styles.button}
          text={"Развернуть"}
        ></Button>
      </form>
      <Circle index={1}></Circle>
    </SolutionLayout>
  );
};

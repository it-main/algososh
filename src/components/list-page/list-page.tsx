import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list-page.module.css";
import { ElementStates } from "../../types/element-states";
import { linkedList } from "./utils";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  type TItem = {
    value: string;
    state: ElementStates;
  };
  type TModifyItem = {
    value: string;
    index: number;
    type: "head" | "tail";
  };
  const [value, setValue] = useState<string>("");
  const [ind, setInd] = useState<number>(0);
  const [list, setList] = useState<TItem[]>(getList());
  const [modifyItem, setModifyItem] = useState<TModifyItem | undefined>();
  const [isLoader, setIsLoader] = useState<Process | undefined>();
  enum Process {
    AddToHead,
    AddToTail,
    AddByIndex,
    RemoveFromHead,
    RemoveFromTail,
    RemoveByIndex,
  }

  function getModifyItem(
    value: string,
    index: number,
    type: "head" | "tail" = "head",
  ): TModifyItem {
    return {
      value,
      index,
      type,
    };
  }

  function getList() {
    return linkedList.toArray().map((item) => {
      return {
        value: item,
        state: ElementStates.Default,
      };
    });
  }

  function handleSetInputValue(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSetInputIndex(event: ChangeEvent<HTMLInputElement>) {
    setInd(Number(event.target.value));
  }

  function addByIndex(value: string, index: number) {
    setModifyItem(getModifyItem(value, index));
    setTimeout(() => {
      linkedList.insertAt(value, index);
      const newList = getList();
      newList[index].state = ElementStates.Modified;
      setList([...newList]);
      setModifyItem(undefined);
      setTimeout(() => {
        const newList = getList();
        newList[index].state = ElementStates.Default;
        setList([...newList]);
        setValue("");
        setIsLoader(undefined);
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  }

  function handleAddToHead() {
    setIsLoader(Process.AddToHead);
    addByIndex(value, 0);
  }

  function handleRemoveFromHead() {
    setIsLoader(Process.RemoveFromHead);
    removeByIndex(0);
  }

  function handleAddToTail() {
    setIsLoader(Process.AddToTail);
    const index = linkedList.getSize() - 1;
    setModifyItem(getModifyItem(value, index));
    setTimeout(() => {
      linkedList.append(value);
      const newList = getList();
      newList[newList.length - 1].state = ElementStates.Modified;
      setList([...newList]);
      setValue("");
      setModifyItem(undefined);
      setIsLoader(undefined);
      setTimeout(() => {
        const newList = getList();
        newList[list.length - 1].state = ElementStates.Default;
        setList([...newList]);
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  }

  function handleRemoveFromTail() {
    setIsLoader(Process.RemoveFromTail);
    removeByIndex(linkedList.getSize() - 1);
  }

  function handleAddByIndex() {
    setIsLoader(Process.AddByIndex);
    if (!linkedList.getSize()) {
      linkedList.append(value);
      setList([...getList()]);
      setIsLoader(undefined);
      setValue("");
      return;
    }
    let index = 0;
    const timer = setInterval(() => {
      let newList = [...list];
      newList[index].state = ElementStates.Changing;
      index++;
      setList([...newList]);
      if (index > ind) {
        addByIndex(value, ind);
        setInd(0);
        clearInterval(timer);
      }
    }, SHORT_DELAY_IN_MS);
  }

  function handleRemoveByIndex() {
    setIsLoader(Process.RemoveByIndex);
    let index = 0;
    const timer = setInterval(() => {
      let newList = [...list];
      newList[index].state = ElementStates.Changing;
      index++;
      setList([...newList]);
      if (index > ind) {
        removeByIndex(ind);
        setInd(0);
        clearInterval(timer);
      }
    }, SHORT_DELAY_IN_MS);
  }
  function removeByIndex(index: number) {
    const newList = [...list];
    const modItem = getModifyItem(newList[index].value, index, "tail");
    newList[index].value = "";
    setTimeout(() => setList([...newList]), SHORT_DELAY_IN_MS);
    setModifyItem(modItem);
    newList[index].state = ElementStates.Default;
    setList([...newList]);
    setTimeout(() => {
      linkedList.removeAt(index);
      setList([...getList()]);
      setModifyItem(undefined);
      setIsLoader(undefined);
    }, SHORT_DELAY_IN_MS);
  }

  function getCircleHead(index: number) {
    if (modifyItem?.index === index && modifyItem.type === "head") {
      return (
        <Circle
          isSmall
          letter={modifyItem.value}
          state={ElementStates.Changing}
        />
      );
    }
    return index === 0 ? "head" : "";
  }

  function getCircleTail(index: number) {
    if (modifyItem?.index === index && modifyItem?.type === "tail") {
      return (
        <Circle
          isSmall
          letter={modifyItem.value}
          state={ElementStates.Changing}
        />
      );
    }
    return index === list.length - 1 ? "tail" : "";
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.wrapper}>
          <Input
            autoFocus
            value={value}
            placeholder="Введите значение"
            onChange={handleSetInputValue}
            maxLength={4}
            isLimitText
            extraClass={styles.input}
            name="value"
          />
          <Button
            text={"Добавить в head"}
            onClick={handleAddToHead}
            isLoader={isLoader === Process.AddToHead}
            extraClass={styles.button}
            linkedList={"small"}
            disabled={
              value === "" ||
              (isLoader !== undefined && isLoader !== Process.AddToHead) ||
              linkedList.getSize() >= 8
            }
          />
          <Button
            text={"Добавить в tail"}
            onClick={handleAddToTail}
            isLoader={isLoader === Process.AddToTail}
            extraClass={styles.button}
            linkedList={"small"}
            disabled={
              value === "" ||
              (isLoader !== undefined && isLoader !== Process.AddToTail) ||
              linkedList.getSize() >= 8
            }
          />
          <Button
            text={"Удалить из head"}
            onClick={handleRemoveFromHead}
            isLoader={isLoader === Process.RemoveFromHead}
            extraClass={styles.button}
            linkedList={"small"}
            disabled={
              !Boolean(linkedList.getSize()) ||
              (isLoader !== undefined && isLoader !== Process.RemoveFromHead)
            }
          />
          <Button
            text={"Удалить из tail"}
            onClick={handleRemoveFromTail}
            isLoader={isLoader === Process.RemoveFromTail}
            extraClass={styles.button}
            linkedList={"small"}
            disabled={
              !Boolean(linkedList.getSize()) ||
              (isLoader !== undefined && isLoader !== Process.RemoveFromTail)
            }
          />
        </div>
        <div className={styles.wrapper}>
          <Input
            value={ind}
            placeholder="Введите индекс"
            type="number"
            min={0}
            extraClass={styles.input}
            onChange={handleSetInputIndex}
            max={Math.max(linkedList.getSize() - 1, 0)}
            isLimitText
          />
          <Button
            text={"Добавить по индексу"}
            onClick={handleAddByIndex}
            isLoader={isLoader === Process.AddByIndex}
            linkedList="big"
            extraClass={styles.button}
            disabled={
              value === "" ||
              ind > Math.max(linkedList.getSize() - 1, 0) ||
              (isLoader !== undefined && isLoader !== Process.AddByIndex) ||
              linkedList.getSize() >= 8
            }
          />
          <Button
            text={"Удалить по индексу"}
            onClick={handleRemoveByIndex}
            isLoader={isLoader === Process.RemoveByIndex}
            linkedList="big"
            extraClass={styles.button}
            disabled={
              !Boolean(linkedList.getSize()) ||
              (isLoader !== undefined && isLoader !== Process.RemoveByIndex)
            }
          />
        </div>
      </form>
      <div className={styles.list}>
        {list.map((item, index) => (
          <div key={index} className={styles.item}>
            <Circle
              index={index}
              letter={item.value}
              head={getCircleHead(index)}
              tail={getCircleTail(index)}
              state={item.state}
            />
            {index < list.length - 1 && (
              <ArrowIcon
                fill={
                  item.state === ElementStates.Changing ? "#D252E1" : undefined
                }
              />
            )}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};

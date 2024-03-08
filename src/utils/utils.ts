export function getArray(minLength: number, maxLength: number, maxNum: number) {
  const array = [];
  const randomLength = Math.trunc(
    Math.random() * (maxLength - minLength + 1) + minLength,
  );
  for (let i = 0; i < randomLength; i++) {
    array.push(String(Math.floor(Math.random() * maxNum + 1)));
  }
  return array;
}

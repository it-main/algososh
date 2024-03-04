export function getFibonacci(i: number): number {
  return i <= 1 ? 1 : getFibonacci(i - 1) + getFibonacci(i - 2);
}

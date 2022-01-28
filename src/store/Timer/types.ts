export type Timer = {
  lastValue: number;
  secondsPassed: number;
  increaseTimer(): void;
  resetTimer(): void;
};

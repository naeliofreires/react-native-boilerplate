import {makeAutoObservable} from 'mobx';
import {Timer} from '~/store/Timer/types';

export const TimerStoreKey = 'timer';
export class TimerStore {
  name = TimerStoreKey;
  lastValue = 0;
  secondsPassed = 0;

  constructor(restoredStore: Timer | null) {
    if (restoredStore) {
      if (restoredStore.lastValue) {
        this.lastValue = restoredStore.lastValue;
      }

      if (restoredStore.secondsPassed) {
        this.secondsPassed = restoredStore.secondsPassed;
      }
    }

    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }

  resetTimer() {
    this.lastValue = this.secondsPassed;
    this.secondsPassed = 0;
  }
}

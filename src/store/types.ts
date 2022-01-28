export type StoreKey = 'timer';

export interface StoreBase {
  name: StoreKey;

  constructor(args: any): void;
}

import {createContext} from 'react';

import {StoreBase} from '~/store/types';
import {TimerStore, TimerStoreKey} from './Timer';

export const StoreInitializer = {
  [TimerStoreKey]: TimerStore,
} as unknown as Record<string, StoreBase>;

export const StoreContext = createContext({});

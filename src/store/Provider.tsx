import React, {useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {StoreContext, StoreInitializer} from '~/store';
import {StoreBase, StoreKey} from '~/store/types';
import {autorun} from 'mobx';

const getStoreStoragePath = (key: StoreKey): string => `store/${key}`;

const setStore = async (store: StoreBase): Promise<void> => {
  try {
    const path = getStoreStoragePath(store.name);
    const value = JSON.stringify(store);
    console.log(path, value);
    await AsyncStorage.setItem(path, value);
  } catch (error) {
    console.error(`Can't load store: ${store.name} - ${error}`);
  }
};

const getStore = async (key: StoreKey): Promise<any> => {
  try {
    const path = getStoreStoragePath(key);
    return JSON.parse((await AsyncStorage.getItem(path)) || '') as StoreBase;
  } catch (error) {
    console.error(`Can't load store: ${key} - ${error}`);
  }
};

const loadStore = async (): Promise<Record<string, StoreBase> | undefined> => {
  try {
    const resource = {} as Record<string, StoreBase>;

    await Promise.all(
      Object.keys(StoreInitializer).map(async key => {
        const restoredStore = await getStore(key as StoreKey);

        // @ts-ignore
        resource[key] = new StoreInitializer[key](restoredStore);
      }),
    );

    return resource;
  } catch (e) {
    console.error(e);
  }
};

export const StoreProvider: React.FC = ({children}) => {
  const [stores, setStores] = useState<Record<string, StoreBase>>({});

  useEffect(() => {
    (async () => {
      setStores((await loadStore()) ?? {});
    })();
  }, []);

  useEffect(() => {
    /**
     * @autorun
     * the function will catch all store changes, and will update it back to the local storage.
     * */
    const unbind = Object.values(stores || {}).map(store => {
      return autorun(
        async () => {
          try {
            await setStore(store as StoreBase);
          } catch (error) {
            console.error(`Unable to save ${(store as StoreBase).name}:`);
          }
        },
        {delay: 1000},
      );
    });

    return () => {
      unbind.forEach(u => u());
    };
  }, [stores]);

  const value = useMemo(() => ({...stores}), [stores]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

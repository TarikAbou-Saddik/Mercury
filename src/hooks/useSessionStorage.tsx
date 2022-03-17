import { useState, Dispatch, SetStateAction } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useSessionStorage<T>(key: string, initialValue?: T): [T, SetValue<T>] {
  const [savedValue, setSavedValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue: SetValue<T> = value => {
    try {
      const valueToStore: T =
        value instanceof Function ? value(savedValue) : value;
      setSavedValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [savedValue, setValue];
}

export default useSessionStorage;

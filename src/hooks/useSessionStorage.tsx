import { useState } from 'react';

function useSessionStorage<T>(
  key: string,
  initialValue?: T,
): [savedValue: T, setValue: (value: T) => void] {
  const [savedValue, setSavedValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
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

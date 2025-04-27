import React, {useCallback, useState} from 'react';

export function useLocalStorage<T = any>(key: string, defaultValue: T): [T, (value: T) => void] {

  const _getValue = () => {
    const storage = localStorage.getItem(key);
    if (storage) {
      return JSON.parse(storage) as T;
    }

    return defaultValue;
  }

  const [value, setValue] = useState<T>(_getValue());

  const _setValue = useCallback((value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  }, [key]);

  return [value, _setValue];
}
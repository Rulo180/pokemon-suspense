import { useEffect, useRef, useState } from "react";

function useLocalStorageState(
  key: string,
  defaultValue: any = "",
  options: {
    serialize?: (value: any) => string;
    deserialize?: (value: string) => any;
  } = {}
) {
  const { serialize = JSON.stringify, deserialize = JSON.parse } = options;
  const [state, setState] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue) {
      return deserialize(storedValue);
    } else {
      return defaultValue;
    }
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, serialize, state]);

  return [state, setState];
}

export { useLocalStorageState };

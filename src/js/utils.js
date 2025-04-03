import { useEffect, useState } from "react";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function writeToLocalStorage(itemName, value) {
  try {
    localStorage.setItem(itemName, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

function readFromLocalStorage(itemName, defaultValue = null) {
  try {
    const result = localStorage.getItem(itemName);
    return result === null ? defaultValue : JSON.parse(result);
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
}

function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const storedState = readFromLocalStorage(key);
    return storedState != null ? storedState : defaultValue;
  });

  useEffect(() => {
    writeToLocalStorage(key, state);
  }, [key, state]);

  return [state, setState];
}

export {
  capitalizeFirstLetter,
  writeToLocalStorage,
  readFromLocalStorage,
  useLocalStorageState,
};

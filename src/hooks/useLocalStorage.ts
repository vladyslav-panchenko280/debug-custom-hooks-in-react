import { useState, useEffect, useDebugValue } from "react";

/**
 * Custom hook to persist state in localStorage
 *
 * BUG #5: Missing 'key' in dependency array
 *
 * Debug this hook using:
 * - React DevTools
 * - Change key prop dynamically
 * - Open multiple tabs
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  useDebugValue(`${key}: ${JSON.stringify(storedValue)}`);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error writing localStorage:", error);
    }
  }, [storedValue, key]); 

  return [storedValue, setStoredValue] as const;
}

import { useState, useEffect, useDebugValue } from "react";

export interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Simulated API delay
const fetchPizzaMenu = (): Promise<Pizza[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Margherita", description: "Classic tomato and mozzarella", price: 12.99, image: "🍕" },
        { id: 2, name: "Pepperoni", description: "Spicy pepperoni with cheese", price: 14.99, image: "🍕" },
        { id: 3, name: "Hawaiian", description: "Ham and pineapple", price: 15.99, image: "🍕" },
        { id: 4, name: "Veggie Supreme", description: "Fresh vegetables medley", price: 13.99, image: "🍕" },
      ]);
    }, 1000);
  });
};

/**
 * Custom hook to fetch pizza menu
 *
 * BUG #1: Missing cleanup - causes race condition in StrictMode
 * BUG #2: State update on unmounted component
 *
 * Debug this hook using:
 * - React DevTools (check useDebugValue output)
 * - StrictMode double-invoke behavior
 * - Console warnings for state updates after unmount
 */
export function usePizzaMenu() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debug value shows in React DevTools
  useDebugValue(loading ? "Loading menu..." : `${pizzas.length} pizzas loaded`);

  useEffect(() => {
    // BUG: No cleanup function - will cause issues in StrictMode
    // BUG: No way to cancel if component unmounts during fetch
    fetchPizzaMenu()
      .then((data) => {
        setPizzas(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { pizzas, loading, error };
}

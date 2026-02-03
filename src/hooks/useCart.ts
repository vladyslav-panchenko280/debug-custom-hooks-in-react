import { useState, useCallback, useDebugValue, useMemo } from "react";
import type { Pizza } from "./usePizzaMenu";

export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

/**
 * Custom hook to manage shopping cart
 *
 * BUG #3: Stale closure in addToCart - missing dependency
 * BUG #4: Total calculation not memoized properly
 *
 * Debug this hook using:
 * - React DevTools (check useDebugValue)
 * - Add same pizza multiple times rapidly
 * - Watch for incorrect quantities
 */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Custom debug value with formatter
  useDebugValue(items, (items) => {
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    return `Cart: ${total} items`;
  });

  const addToCart = useCallback(
    (pizza: Pizza) => {
      const existingItem = items.find((item) => item.pizza.id === pizza.id);

      if (existingItem) {
        setItems(
          items.map((item) =>
            item.pizza.id === pizza.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        );
      } else {
        setItems([...items, { pizza, quantity: 1 }]);
      }
    },
    [items],
  );

  const removeFromCart = useCallback((pizzaId: number) => {
    setItems((prev) => prev.filter((item) => item.pizza.id !== pizzaId));
  }, []);

  const updateQuantity = useCallback((pizzaId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.pizza.id !== pizzaId));
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.pizza.id === pizzaId ? { ...item, quantity } : item,
        ),
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.pizza.price * item.quantity, 0),
    [items],
  );

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
  };
}

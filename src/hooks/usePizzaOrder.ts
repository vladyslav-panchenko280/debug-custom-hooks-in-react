import { useState, useEffect, useDebugValue } from "react";
import type { CartItem } from "./useCart";

export interface OrderStatus {
  status: "idle" | "processing" | "confirmed" | "error";
  orderId: string | null;
  message: string;
}

/**
 * Custom hook to handle pizza order submission
 *
 * BUG #7: Object in dependency array causes infinite loop
 * BUG #8: Missing cleanup for async operation
 *
 * Debug this hook using:
 * - React DevTools Profiler
 * - Console to see repeated renders
 * - StrictMode behavior
 */
export function usePizzaOrder(cartItems: CartItem[]) {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    status: "idle",
    orderId: null,
    message: "",
  });

  useDebugValue(orderStatus.status);

  // BUG: cartItems is a new array reference each render
  // This causes infinite re-runs of useEffect
  useEffect(() => {
    if (cartItems.length > 0) {
      console.log("Order hook effect running - cart updated");
      // This log will spam if parent re-renders often
    }
  }, [cartItems]); // BUG: Array reference changes every render!

  const submitOrder = async (customerName: string) => {
    if (cartItems.length === 0) {
      setOrderStatus({
        status: "error",
        orderId: null,
        message: "Cart is empty!",
      });
      return;
    }

    setOrderStatus({
      status: "processing",
      orderId: null,
      message: "Processing your order...",
    });

    // Simulate API call
    // BUG: No cleanup if component unmounts during this
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const orderId = `ORD-${Date.now()}`;
    setOrderStatus({
      status: "confirmed",
      orderId,
      message: `Order ${orderId} confirmed!`,
    });
  };

  const resetOrder = () => {
    setOrderStatus({
      status: "idle",
      orderId: null,
      message: "",
    });
  };

  return { orderStatus, submitOrder, resetOrder };
}

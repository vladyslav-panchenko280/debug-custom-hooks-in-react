import { useState, useEffect, useDebugValue, useRef } from "react";
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
  const cancelledRef = useRef(false);

  useDebugValue(orderStatus.status);

  useEffect(() => {
    if (cartItems.length > 0) {
      console.log("Order hook effect running - cart updated");
    }
  }, [cartItems]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      console.log("Cleanup: cancelling order");
    };
  }, []);

  const submitOrder = async (customerName: string) => {
    console.log("Submitting order for", customerName);
    if (cartItems.length === 0) {
      setOrderStatus({
        status: "error",
        orderId: null,
        message: "Cart is empty!",
      });
      return;
    }

    cancelledRef.current = false; // reset on new order

    setOrderStatus({
      status: "processing",
      orderId: null,
      message: "Processing your order...",
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if cancelled after await
    if (cancelledRef.current) {
      setOrderStatus({
        status: "error",
        orderId: null,
        message: "Order was cancelled.",
      });
      return;
    }

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

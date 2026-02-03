import type { OrderStatus } from "../hooks";

interface OrderConfirmationProps {
  orderStatus: OrderStatus;
  onReset: () => void;
}

export function OrderConfirmation({ orderStatus, onReset }: OrderConfirmationProps) {
  if (orderStatus.status === "idle") {
    return null;
  }

  return (
    <div className={`order-status ${orderStatus.status}`}>
      {orderStatus.status === "processing" && (
        <div className="processing">
          <span className="spinner">⏳</span>
          <p>{orderStatus.message}</p>
        </div>
      )}

      {orderStatus.status === "confirmed" && (
        <div className="confirmed">
          <span className="success-icon">✅</span>
          <p>{orderStatus.message}</p>
          <button onClick={onReset}>Order More Pizza</button>
        </div>
      )}

      {orderStatus.status === "error" && (
        <div className="error">
          <span className="error-icon">❌</span>
          <p>{orderStatus.message}</p>
          <button onClick={onReset}>Try Again</button>
        </div>
      )}
    </div>
  );
}

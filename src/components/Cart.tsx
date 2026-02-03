import type { CartItem } from "../hooks";

interface CartProps {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (pizzaId: number, quantity: number) => void;
  onRemove: (pizzaId: number) => void;
  onClear: () => void;
  onCheckout: () => void;
}

export function Cart({
  items,
  total,
  onUpdateQuantity,
  onRemove,
  onClear,
  onCheckout,
}: CartProps) {
  if (items.length === 0) {
    return (
      <div className="cart empty">
        <h2>Your Cart</h2>
        <p>Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul className="cart-items">
        {items.map((item) => (
          <li key={item.pizza.id} className="cart-item">
            <span className="item-name">
              {item.pizza.image} {item.pizza.name}
            </span>
            <div className="item-controls">
              <button
                onClick={() => onUpdateQuantity(item.pizza.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.pizza.id, item.quantity + 1)}
              >
                +
              </button>
              <button className="remove" onClick={() => onRemove(item.pizza.id)}>
                x
              </button>
            </div>
            <span className="item-total">
              ${(item.pizza.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="cart-footer">
        <p className="total">Total: ${total.toFixed(2)}</p>
        <div className="cart-actions">
          <button onClick={onClear}>Clear Cart</button>
          <button className="checkout" onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

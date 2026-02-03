import { useState } from "react";
import { usePizzaMenu, useCart, usePizzaOrder, useLocalStorage } from "./hooks";
import { PizzaMenu, Cart, OrderConfirmation } from "./components";
import "./App.css";

function App() {
  const { pizzas, loading, error } = usePizzaMenu();
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, total } =
    useCart();
  const { orderStatus, submitOrder, resetOrder } = usePizzaOrder(items);

  // Using localStorage to persist customer name
  const [customerName, setCustomerName] = useLocalStorage("customerName", "");
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleSubmitOrder = () => {
    if (customerName.trim()) {
      submitOrder(customerName);
      clearCart();
      setShowCheckout(false);
    }
  };

  const handleReset = () => {
    resetOrder();
  };

  return (
    <div className="app">
      <header>
        <h1>🍕 Pizza Debug Shop</h1>
        <p className="subtitle">Find the bugs using React DevTools!</p>
      </header>

      <main>
        {orderStatus.status !== "idle" ? (
          <OrderConfirmation orderStatus={orderStatus} onReset={handleReset} />
        ) : (
          <>
            <PizzaMenu
              pizzas={pizzas}
              loading={loading}
              error={error}
              onAddToCart={addToCart}
            />

            <Cart
              items={items}
              total={total}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onClear={clearCart}
              onCheckout={handleCheckout}
            />

            {showCheckout && (
              <div className="checkout-modal">
                <div className="checkout-content">
                  <h3>Complete Your Order</h3>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <div className="checkout-actions">
                    <button onClick={() => setShowCheckout(false)}>Cancel</button>
                    <button
                      className="submit"
                      onClick={handleSubmitOrder}
                      disabled={!customerName.trim()}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer>
        <p>Open React DevTools to debug custom hooks</p>
      </footer>
    </div>
  );
}

export default App;

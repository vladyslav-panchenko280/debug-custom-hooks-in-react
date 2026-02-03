import type { Pizza } from "../hooks";

interface PizzaMenuProps {
  pizzas: Pizza[];
  loading: boolean;
  error: string | null;
  onAddToCart: (pizza: Pizza) => void;
}

export function PizzaMenu({ pizzas, loading, error, onAddToCart }: PizzaMenuProps) {
  if (loading) {
    return <div className="loading">Loading pizzas...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="pizza-menu">
      <h2>Our Menu</h2>
      <div className="pizza-grid">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="pizza-card">
            <span className="pizza-image">{pizza.image}</span>
            <h3>{pizza.name}</h3>
            <p>{pizza.description}</p>
            <p className="price">${pizza.price.toFixed(2)}</p>
            <button onClick={() => onAddToCart(pizza)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

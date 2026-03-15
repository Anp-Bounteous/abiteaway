import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import { useAppContext } from "../context/AppContext";

export default function Cart() {
  const { cartItems, cartSubtotal, cartTotal, updateCartItem, removeCartItem, currentUser } =
    useAppContext();

  if (!currentUser) {
    return (
      <div className="empty-state">
        <h2>Sign in to manage your cart.</h2>
        <p>Your saved items and checkout are available after login.</p>
        <Link to="/login" className="pill-button">
          Login
        </Link>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty.</h2>
        <p>Browse the menu and add a few dishes to get started.</p>
        <Link to="/products" className="pill-button">
          Explore menu
        </Link>
      </div>
    );
  }

  return (
    <section className="checkout-grid">
      <div className="stack-md">
        <div className="section-head">
          <div>
            <span className="eyebrow">Cart</span>
            <h1>Review your order</h1>
          </div>
        </div>

        {cartItems.map((item) => (
          <article className="cart-card" key={item.foodId}>
            <LazyImage src={item.food.image} alt={item.food.name} className="cart-image" />
            <div className="cart-copy">
              <h3>{item.food.name}</h3>
              <p>{item.food.restaurant}</p>
              <strong>Rs. {item.food.price}</strong>
            </div>
            <div className="cart-actions">
              <div className="quantity-box compact">
                <button
                  type="button"
                  onClick={() => void updateCartItem(item.foodId, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => void updateCartItem(item.foodId, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="text-link danger"
                onClick={() => void removeCartItem(item.foodId)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="summary-card">
        <h2>Bill summary</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>Rs. {cartSubtotal}</span>
        </div>
        <div className="summary-row">
          <span>Delivery fee</span>
          <span>Rs. 49</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>Rs. {cartTotal}</span>
        </div>
        <Link to="/checkout" className="pill-button full-width">
          Proceed to checkout
        </Link>
      </aside>
    </section>
  );
}

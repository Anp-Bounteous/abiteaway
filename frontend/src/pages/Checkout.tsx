import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAppContext } from "../context/AppContext";
import { getErrorMessage } from "../lib/api";

export default function Checkout() {
  const navigate = useNavigate();
  const { currentUser, cartItems, cartTotal, placeOrder } = useAppContext();
  const [deliveryAddress, setDeliveryAddress] = useState(
    currentUser?.address ?? "221B Flavor Street, Bengaluru",
  );
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  if (!currentUser) {
    return (
      <div className="empty-state">
        <h2>Login required for checkout.</h2>
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
        <Link to="/products" className="pill-button">
          Browse menu
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    try {
      setPlacingOrder(true);
      setError("");
      await placeOrder({ deliveryAddress, paymentMethod });
      navigate("/orders");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to place order."));
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <section className="checkout-grid">
      <div className="form-card">
        <span className="eyebrow">Checkout</span>
        <h1>Confirm your order</h1>

        <label className="input-shell">
          <span>Delivery address</span>
          <textarea
            rows={4}
            value={deliveryAddress}
            onChange={(event) => setDeliveryAddress(event.target.value)}
          />
        </label>

        <label className="input-shell">
          <span>Payment method</span>
          <select
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Card</option>
          </select>
        </label>

        {error ? <div className="toast-message error">{error}</div> : null}

        <button
          type="button"
          className="pill-button full-width"
          onClick={handlePlaceOrder}
          disabled={placingOrder}
        >
          {placingOrder ? <LoadingSpinner label="Placing order" /> : "Place order"}
        </button>
      </div>

      <aside className="summary-card">
        <h2>Order items</h2>
        {cartItems.map((item) => (
          <div className="summary-row" key={item.foodId}>
            <span>
              {item.food.name} x {item.quantity}
            </span>
            <span>Rs. {item.food.price * item.quantity}</span>
          </div>
        ))}
        <div className="summary-row total">
          <span>Total payable</span>
          <span>Rs. {cartTotal}</span>
        </div>
      </aside>
    </section>
  );
}

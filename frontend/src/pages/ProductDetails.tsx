import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAppContext } from "../context/AppContext";
import { getErrorMessage } from "../lib/api";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { foods, addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const food = useMemo(() => foods.find((item) => item.id === id), [foods, id]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, [id]);

  if (loading) {
    return <div className="skeleton skeleton-hero" />;
  }

  if (!food) {
    return (
      <div className="empty-state">
        <h2>Dish not found.</h2>
        <Link to="/products" className="pill-button">
          Back to menu
        </Link>
      </div>
    );
  }

  const handleAdd = async () => {
    try {
      setBusy(true);
      await addToCart(food.id, quantity);
      setMessage("Added to cart.");
      window.setTimeout(() => navigate("/cart"), 500);
    } catch (error) {
      setMessage(getErrorMessage(error, "Unable to add item."));
    } finally {
      window.setTimeout(() => setBusy(false), 300);
    }
  };

  return (
    <section className="section-block detail-layout">
      <LazyImage src={food.image} alt={food.name} className="detail-image" />

      <div className="detail-copy">
        <span className="eyebrow">{food.restaurant}</span>
        <h1>{food.name}</h1>
        <p className="detail-description">{food.description}</p>

        <div className="detail-stats">
          <div>
            <strong>{food.rating}</strong>
            <span>Rating</span>
          </div>
          <div>
            <strong>{food.deliveryTime}</strong>
            <span>Delivery</span>
          </div>
          <div>
            <strong>{food.isVeg ? "Veg" : "Non-Veg"}</strong>
            <span>Preference</span>
          </div>
        </div>

        <div className="detail-purchase">
          <strong className="detail-price">Rs. {food.price}</strong>
          <div className="quantity-box">
            <button type="button" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((prev) => prev + 1)}>
              +
            </button>
          </div>
        </div>

        <div className="inline-actions">
          <button
            type="button"
            className="pill-button"
            onClick={() => void handleAdd()}
            disabled={busy}
          >
            {busy ? <LoadingSpinner label="Adding" /> : "Add to cart"}
          </button>
          <Link to="/products" className="pill-button ghost">
            Continue browsing
          </Link>
        </div>

        {message ? <div className="toast-message">{message}</div> : null}
      </div>
    </section>
  );
}

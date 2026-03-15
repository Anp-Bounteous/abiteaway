import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAppContext } from "../context/AppContext";
import { getErrorMessage } from "../lib/api";

export default function Products() {
  const { foods, addToCart, currentUser } = useAppContext();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(foods.map((food) => food.category))],
    [foods],
  );

  const filteredFoods = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return foods.filter((food) => {
      const matchesCategory = category === "All" || food.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${food.name} ${food.restaurant} ${food.description}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, foods, query]);

  const handleAddToCart = async (foodId: string) => {
    try {
      setBusyId(foodId);
      await addToCart(foodId, 1);
      setNotice(currentUser ? "Item added to cart." : "Please sign in to add items.");
    } catch (error) {
      setNotice(getErrorMessage(error, "Unable to add item."));
    } finally {
      window.setTimeout(() => setBusyId(null), 300);
    }
  };

  return (
    <div className="stack-lg">
      <section className="section-block">
        <div className="section-head">
          <div>
            <span className="eyebrow">Menu</span>
            <h1>Find your next meal</h1>
          </div>
          <p className="muted-copy">Search dishes, filter by category, and add instantly.</p>
        </div>

        <div className="toolbar">
          <label className="input-shell search-shell">
            <span>Search</span>
            <input
              type="search"
              placeholder="Search burgers, wraps, sushi..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <label className="input-shell select-shell">
            <span>Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        {notice ? <div className="toast-message">{notice}</div> : null}

        {loading ? (
          <div className="card-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="skeleton skeleton-card" key={index} />
            ))}
          </div>
        ) : (
          <div className="card-grid">
            {filteredFoods.map((food) => (
              <article className="food-card" key={food.id}>
                <LazyImage src={food.image} alt={food.name} className="food-card-image" />
                <div className="food-card-body">
                  <div className="card-topline">
                    <span>{food.category}</span>
                    <span>{food.rating} star</span>
                  </div>
                  <h3>{food.name}</h3>
                  <p>{food.description}</p>
                  <div className="card-meta">
                    <span>{food.restaurant}</span>
                    <span>{food.deliveryTime}</span>
                  </div>
                  <div className="card-footer">
                    <strong>Rs. {food.price}</strong>
                    <div className="inline-actions">
                      <Link className="pill-button ghost" to={`/products/${food.id}`}>
                        Details
                      </Link>
                      <button
                        type="button"
                        className="pill-button"
                        onClick={() => void handleAddToCart(food.id)}
                        disabled={busyId === food.id}
                      >
                        {busyId === food.id ? <LoadingSpinner label="Adding" /> : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !filteredFoods.length ? (
          <div className="empty-state">
            <h3>No dishes match that search.</h3>
            <p>Try a shorter keyword or switch categories.</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}

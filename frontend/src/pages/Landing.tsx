import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import LazyImage from "../components/LazyImage";
import { useAppContext } from "../context/AppContext";

export default function Landing() {
  const { foods } = useAppContext();
  const featured = foods.slice(0, 4);

  return (
    <div className="stack-xl">
      <Carousel />

      <section className="hero-strip">
        <div>
          <span className="eyebrow">Why ABiteAway</span>
          <h2>Fast discovery, rich product pages, and a cleaner checkout flow.</h2>
        </div>
        <div className="hero-metrics">
          <div>
            <strong>30 min</strong>
            <span>Average delivery window</span>
          </div>
          <div>
            <strong>4.7+</strong>
            <span>Average dish rating</span>
          </div>
          <div>
            <strong>8</strong>
            <span>Chef-curated highlights</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <span className="eyebrow">Top picks</span>
            <h2>Popular right now</h2>
          </div>
          <Link to="/products" className="text-link">
            Explore full menu
          </Link>
        </div>

        <div className="card-grid">
          {featured.map((food) => (
            <article className="food-card" key={food.id}>
              <LazyImage src={food.image} alt={food.name} className="food-card-image" />
              <div className="food-card-body">
                <div className="card-topline">
                  <span>{food.restaurant}</span>
                  <span>{food.deliveryTime}</span>
                </div>
                <h3>{food.name}</h3>
                <p>{food.description}</p>
                <div className="card-footer">
                  <strong>Rs. {food.price}</strong>
                  <Link className="pill-button" to={`/products/${food.id}`}>
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block info-banner">
        <div>
          <span className="eyebrow">Built for repeat orders</span>
          <h2>Fresh dining picks, quick delivery, and comfort meals for every craving.</h2>
          <p className="muted-copy">
            From lunch bowls to late-night burgers, ABiteAway helps customers discover
            the right meal, place the order quickly, and get it delivered without delay.
          </p>
        </div>
        <div className="info-points">
          <article className="feature-tile">
            <span className="feature-index">01</span>
            <div>
              <h3>Curated dining variety</h3>
              <p>Explore burgers, pizzas, bowls, wraps, and chef specials in one menu.</p>
            </div>
          </article>
          <article className="feature-tile">
            <span className="feature-index">02</span>
            <div>
              <h3>Fast doorstep delivery</h3>
              <p>Built around quick ordering flows so meals move from menu to checkout fast.</p>
            </div>
          </article>
          <article className="feature-tile">
            <span className="feature-index">03</span>
            <div>
              <h3>Comfort food for every moment</h3>
              <p>Whether it is lunch, dinner, or midnight cravings, the menu stays ready.</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, orders, cartCount, logout } = useAppContext();

  if (!currentUser) {
    return null;
  }

  return (
    <section className="profile-grid">
      <article className="profile-card accent">
        <span className="eyebrow">Profile</span>
        <h1>{currentUser.name}</h1>
        <p>{currentUser.email}</p>
        <div className="profile-meta">
          <div>
            <span>Phone</span>
            <strong>{currentUser.phone}</strong>
          </div>
          <div>
            <span>Address</span>
            <strong>{currentUser.address}</strong>
          </div>
          <div>
            <span>Joined</span>
            <strong>{new Date(currentUser.joinedAt).toLocaleDateString()}</strong>
          </div>
        </div>
        <button
          type="button"
          className="pill-button secondary"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </article>

      <article className="profile-card">
        <h2>Account snapshot</h2>
        <div className="hero-metrics">
          <div>
            <strong>{orders.length}</strong>
            <span>Total orders</span>
          </div>
          <div>
            <strong>{cartCount}</strong>
            <span>Items in cart</span>
          </div>
          <div>
            <strong>Prime</strong>
            <span>Loyalty tier</span>
          </div>
        </div>
      </article>
    </section>
  );
}

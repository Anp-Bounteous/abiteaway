import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Menu" },
  { to: "/cart", label: "Cart" },
  { to: "/orders", label: "Orders" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser, cartCount, logout } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link to="/" className="brand-mark">
          <span className="brand-badge">AB</span>
          <div>
            <strong>ABiteAway</strong>
            <span>Fresh food, fast mood</span>
          </div>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              {item.to === "/cart" && cartCount > 0 ? (
                <span className="cart-badge">{cartCount}</span>
              ) : null}
            </NavLink>
          ))}

          {currentUser ? (
            <button type="button" className="nav-cta secondary" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="nav-cta" onClick={() => setMenuOpen(false)}>
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

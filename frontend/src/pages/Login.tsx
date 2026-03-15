import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAppContext } from "../context/AppContext";
import { getErrorMessage } from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/products";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login({ email, password });
      navigate(redirectTo);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Login failed."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-shell">
      <form className="form-card auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">Welcome back</span>
        <h1>Login to ABiteAway</h1>

        <label className="input-shell">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="input-shell">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error ? <div className="toast-message error">{error}</div> : null}

        <button type="submit" className="pill-button full-width" disabled={loading}>
          {loading ? <LoadingSpinner label="Signing in" /> : "Login"}
        </button>

        <p className="auth-meta">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </section>
  );
}

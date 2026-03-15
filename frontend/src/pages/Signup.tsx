import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAppContext } from "../context/AppContext";
import { getErrorMessage } from "../lib/api";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      await signup({ name, email, password });
      navigate("/products");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Signup failed."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-shell">
      <form className="form-card auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">Create account</span>
        <h1>Start ordering with ABiteAway</h1>

        <label className="input-shell">
          <span>Full name</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

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
          {loading ? <LoadingSpinner label="Creating account" /> : "Signup"}
        </button>

        <p className="auth-meta">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}

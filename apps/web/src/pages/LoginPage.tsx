import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/api";

function LoginPage() {
  const [email, setEmail] = useState("demo@bizboard.app");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(email);
      localStorage.setItem("bizboard-token", result.token);
      navigate("/");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <section className="panel" style={{ maxWidth: "460px", margin: "4rem auto" }}>
        <h1>BizBoard</h1>
        <p className="muted">Create and share your digital business card.</p>
        <form onSubmit={onSubmit} className="grid">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          {error && <p style={{ color: "#9e2a2b" }}>{error}</p>}
        </form>
      </section>
    </main>
  );
}

export { LoginPage };

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    try {
      await login(form.username, form.password);
      nav("/tasks", { replace: true });
    } catch (e2) {
      setErr(e2?.response?.data?.detail || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="container" style={{ maxWidth: 380 }}>
      <h1 className="mb-3">Login</h1>
      <input
        className="form-control mb-2"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        className="form-control mb-3"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="btn btn-primary w-100" disabled={busy} type="submit">
        {busy ? "Logging in…" : "Login"}
      </button>
      {err && <div className="text-danger mt-2">{err}</div>}
    </form>
  );
}

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../store/auth";

export default function RegisterPage() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/user/register/", form);
      await login(form.username, form.password);
      // Save tokens + user in auth store
      nav("/tasks", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data
          ? JSON.stringify(err.response.data)
          : err.message || "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 500 }}>
      <h2 className="mb-4">Create an Account</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">First name</label>
            <input
              className="form-control"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Last name</label>
            <input
              className="form-control"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="password2"
            value={form.password2}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Registering…" : "Register"}
        </button>
      </form>

      <div className="mt-3 text-center">
        <small>
          Already have an account? <Link to="/login">Login here</Link>
        </small>
      </div>
    </div>
  );
}

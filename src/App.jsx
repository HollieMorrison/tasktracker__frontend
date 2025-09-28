import "./App.css";
import Tasks from "./tasks/tasks";
import LoginPage from "./social/login";
import { Routes, Route, Link, NavLink, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./store/auth";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary bg-gradient shadow-sm">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand fw-semibold" to="/">
            TaskApp
          </Link>

          {/* Mobile toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  end
                  to="/"
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/tasks"
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                  Tasks
                </NavLink>
              </li>
            </ul>

            {/* Right side */}
            <div className="d-flex align-items-center gap-2">
              {user ? (
                <>
                  <span className="text-white-50 small">Hi, {user.username}</span>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink to="/login" className="btn btn-outline-light">
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

// Minimal route guard using store state
function Protected({ children }) {
  const { loading, user } = useAuth();
  if (loading) return <div className="container py-4">Loading…</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const { hydrate, user, loading } = useAuth();
  const nav = useNavigate();

  // On first load: try refresh -> /me
  useEffect(() => {
    (async () => {
      await hydrate();
    })();
  }, [hydrate]);

  // If finished hydrating and not logged in, make sure URL is /login
  useEffect(() => {
    if (!loading && !user) nav("/login", { replace: true });
  }, [loading, user, nav]);

  return (
    <div>
      <Header />

      <Routes>
        {/* Send "/" to /tasks for convenience */}
        <Route path="/" element={<Navigate to="/tasks" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/tasks"
          element={
            <Protected>
              <Tasks />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
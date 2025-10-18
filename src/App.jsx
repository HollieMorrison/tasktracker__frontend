import "./App.css";
import Tasks from "./tasks/tasks";
import TaskPage from "./tasks/taskpage";
import LoginPage from "./social/login";
import RegisterPage from "./social/register";
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
            TaskTracker
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
                    <button className="btn btn-outline-light btn-sm" onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className="btn btn-outline-light">
                      Login
                    </NavLink>
                    <NavLink to="/register" className="btn btn-light">
                      Register
                    </NavLink>
                  </>
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

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          {/* Left Section */}
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="fw-bold mb-1">TaskTracker</h5>
            <small className="text-muted">
              Manage your goals. Track your progress. Stay organized.
            </small>
          </div>

          {/* Center Section */}
          <div className="col-md-4 mb-3 mb-md-0 d-flex justify-content-center gap-3">
            <a
              href="https://github.com/"
              className="text-light text-decoration-none"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-github fs-4"></i>
            </a>
            <a
              href="https://linkedin.com/"
              className="text-light text-decoration-none"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-linkedin fs-4"></i>
            </a>
            <a
              href="mailto:hello@tasktracker.com"
              className="text-light text-decoration-none"
            >
              <i className="bi bi-envelope fs-4"></i>
            </a>
          </div>

          {/* Right Section */}
          <div className="col-md-4 text-md-end">
            <small>
              © {new Date().getFullYear()} <strong>TaskTracker API</strong>. All rights reserved.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
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

  useEffect(() => {

  }, [loading, user, nav]);

  return (
    <div>
      <Header />

      <Routes>

        <Route path="/" element={<Navigate to="/tasks" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

     
        <Route
          path="/tasks"
          element={
            <Protected>
              <Tasks />
            </Protected>
          }
        />

        <Route

          path={`/task/:id`}
          element={
            <Protected>
              <TaskPage/>
            </Protected>
          }
        />
   
      </Routes>
    
      <Footer />

    </div>
  );
}

export default App;
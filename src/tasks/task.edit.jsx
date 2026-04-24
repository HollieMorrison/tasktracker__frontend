import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";

const priorityMap = {
  Low: 1,
  Medium: 2,
  High: 3,
  Urgent: 4,
};

const reversePriorityMap = {
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

export default function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [state, setState] = useState("open");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTask() {
      try {
        const { data } = await api.get(`/api/tasks/${id}/`);
        setTitle(data.title || "");
        setDescription(data.description || "");
        setPriority(reversePriorityMap[data.priority] || "Medium");
        setState(data.state || "open");

        if (data.due_date) {
          setDueDate(data.due_date.slice(0, 10));
        }
      } catch {
        setError("Could not load this task.");
      } finally {
        setLoading(false);
      }
    }

    loadTask();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.patch(`/api/tasks/${id}/`, {
        title,
        description,
        priority: priorityMap[priority],
        state,
        due_date: dueDate ? `${dueDate}T23:59:00Z` : null,
      });

      navigate("/tasks");
    } catch {
      setError("Could not update this task.");
    }
  };

  if (loading) {
    return <div className="container py-5">Loading task...</div>;
  }

  return (
    <div className="container py-5 page-shell">
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Task</h1>
          <p className="page-subtitle">
            Update your task details, priority, status, and deadline.
          </p>
        </div>
      </div>

      <div className="auth-card task-panel">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Priority</label>
              <select
                className="form-select"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Status</label>
              <select
                className="form-select"
                value={state}
                onChange={(event) => setState(event.target.value)}
              >
                <option value="open">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/tasks")}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

const priorityMap = {
  low: 1,
  medium: 2,
  high: 3,
  urgent: 4,
};

const stateMap = {
  todo: "open",
  "in progress": "in_progress",
  done: "done",
  cancelled: "cancelled",
};

function toISODateEndOfDay(value) {
  if (!value) return null;
  const date = new Date(`${value}T23:59:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export default function TaskCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim() || "",
      priority: priorityMap[priority],
      state: stateMap[status],
      due_date: dueDate ? toISODateEndOfDay(dueDate) : null,
    };

    setSubmitting(true);
    setError("");

    try {
      const { data } = await api.post("/api/tasks/", payload);
      console.log("Created task:", data);
      navigate("/tasks");
    } catch (err) {
      console.error("Create task error:", err?.response?.data || err);
      const message =
        typeof err?.response?.data === "string"
          ? err.response.data
          : JSON.stringify(err?.response?.data || { detail: "Failed to create task." });
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container py-4 page-shell">
      <div className="page-header">
        <div>
          <h1 className="page-title">Create Task</h1>
          <p className="page-subtitle">
            Add a new task, set its priority, and plan your deadline.
          </p>
        </div>
      </div>

      <div className="auth-card task-panel">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold">Title *</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter task title"
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
              placeholder="Add details about this task"
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
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="in progress">In Progress</option>
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
              disabled={submitting}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
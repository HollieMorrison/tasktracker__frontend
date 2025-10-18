import { useState, useEffect } from "react";
import { api } from "../api/client";

/**
 * Props:
 * - show: boolean
 * - onClose: () => void
 * - onCreated: (task) => void  // called with the created task from server
 */
export default function CreateTaskModal({ show, onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(2); // Medium
  const [state, setState] = useState("open");
  const [dueLocal, setDueLocal] = useState(""); // yyyy-MM-ddTHH:mm for input type="datetime-local"
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Reset form whenever modal opens
  useEffect(() => {
    if (show) {
      setTitle("");
      setDescription("");
      setPriority(2);
      setState("open");
      setDueLocal("");
      setError("");
      setSubmitting(false);
    }
  }, [show]);

  function toISO(dtLocal) {
    // dtLocal expected like "2025-10-01T18:00"
    if (!dtLocal) return null;
    try {
      const d = new Date(dtLocal);
      return d.toISOString();
    } catch {
      return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority: Number(priority),
      state,
      due_date: toISO(dueLocal) || undefined, // only send if provided
    };

    setSubmitting(true);
    setError("");
    try {
      const { data } = await api.post("/api/tasks/", payload);
      onCreated?.(data);
      onClose?.();
    } catch (err) {
      const msg =
        err?.response?.data
          ? JSON.stringify(err.response.data)
          : err?.message || "Failed to create task";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (!show) return null;

  return (
    <>
      <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Create Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={onClose}
                  disabled={submitting}
                />
              </div>

              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Title *</label>
                  <input
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Finish onboarding docs"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional details…"
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="4">Urgent</option>
                      <option value="3">High</option>
                      <option value="2">Medium</option>
                      <option value="1">Low</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">State</label>
                    <select
                      className="form-select"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In progress</option>
                      <option value="done">Done</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Due date</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={dueLocal}
                      onChange={(e) => setDueLocal(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? "Creating…" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { api } from "../api/client";

const PRIORITY_LABELS = { 1: "Low", 2: "Medium", 3: "High", 4: "Urgent" };

export default function EditTaskModal({ show, task, onUpdated, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: 2,
    due_date: "", // yyyy-MM-ddTHH:mm (for datetime-local)
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  // Reset form each time modal is opened or task changes
  useEffect(() => {
    if (!show || !task) return;
    setForm({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || 2,
      due_date: task.due_date ? task.due_date.slice(0, 16) : "",
    });
    setError("");
    setSaving(false);
  }, [show, task]);

  // ESC to close
  useEffect(() => {
    if (!show) return;
    const onKey = (e) => e.key === "Escape" && !saving && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, saving, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const buildPayload = (extra = {}) => {
    return {
      title: form.title?.trim(),
      description: form.description?.trim(),
      priority: Number(form.priority),
      due_date: form.due_date ? new Date(form.due_date).toISOString() : null,
      ...extra,
    };
  };

  const handleSave = async (extra = {}) => {
    if (!task) return;
    setSaving(true);
    setError("");
    try {
      const payload = buildPayload(extra);
      const { data } = await api.patch(`/api/tasks/${task.id}/`, payload);
      onUpdated?.(data);
      if (!extra.state) onClose?.(); // close on full save; keep open for quick state taps
    } catch (err) {
      const msg =
        err?.response?.data
          ? JSON.stringify(err.response.data)
          : err?.message || "Failed to update task";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (!show) return null;

  // Click backdrop to close
  const onBackdrop = (e) => {
    if (modalRef.current && e.target === modalRef.current && !saving) onClose?.();
  };

  return (
    <>
      <div
        className="modal show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editTaskTitle"
        onMouseDown={onBackdrop}
        ref={modalRef}
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title" id="editTaskTitle">Edit Task</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose} disabled={saving} />
            </div>

            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="mb-3">
                <label className="form-label">Title</label>
                <input className="form-control" name="title" value={form.title} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" rows={3} value={form.description} onChange={handleChange} />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Priority</label>
                  <select className="form-select" name="priority" value={form.priority} onChange={handleChange}>
                    {Object.entries(PRIORITY_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Due Date</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="due_date"
                    value={form.due_date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-1">
                <label className="form-label d-block">Progress</label>
                <div className="btn-group" role="group" aria-label="State">
                  {["open", "in_progress", "done", "cancelled"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`btn btn-${task.state === s ? "primary" : "outline-primary"}`}
                      onClick={() => handleSave({ state: s })}
                      disabled={saving}
                      title={`Set state to ${s.replace(/_/g, " ")}`}
                    >
                      {s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </button>
                  ))}
                </div>
                <div className="form-text">
                  Click a state to update immediately. Use “Save Changes” for other edits.
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={onClose} disabled={saving}>
                Close
              </button>
              <button className="btn btn-success" onClick={() => handleSave()} disabled={saving}>
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

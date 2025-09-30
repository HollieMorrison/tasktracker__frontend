import { useState } from "react";
import EditTaskModal from "./task.edit";

const PRIORITY_LABELS = { 1: "Low", 2: "Medium", 3: "High", 4: "Urgent" };

function humanState(s) {
  if (!s) return "";
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function TaskCard({ task, onUpdated, onDelete }) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <div className="card shadow-sm h-100 border-0">
        <div className={`border-top border-4 ${task.is_overdue ? "border-danger" : "border-secondary"}`} />
        <div className="card-body">
          <h5 className="card-title mb-1">{task.title}</h5>
          <div className="text-muted small mb-2">
            Category: {task.category__name || "Uncategorized"}
          </div>

          {task.description && <p className="card-text">{task.description}</p>}

          <div className="mb-2 small">
            <div><strong>State:</strong> {humanState(task.state)}</div>
            <div><strong>Priority:</strong> {PRIORITY_LABELS[task.priority] || task.priority}</div>
            <div>
              <strong>Due:</strong>{" "}
              {task.due_date ? new Date(task.due_date).toLocaleString() : "No due date"}
            </div>
            <div>
              <strong>Overdue:</strong>{" "}
              {task.is_overdue ? (
                <span className="badge bg-danger">Yes</span>
              ) : (
                <span className="badge bg-success">No</span>
              )}
            </div>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm" onClick={() => setShowEdit(true)}>
              Edit
            </button>
            {onDelete && (
              <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(task)}>
                Delete
              </button>
            )}
          </div>
        </div>
        <div className="card-footer bg-white border-0 text-muted small">
          Created by {task.created_by__username} ·{" "}
          {task.created_at ? new Date(task.created_at).toLocaleDateString() : "—"}
        </div>
      </div>

      <EditTaskModal
        show={showEdit}
        task={task}
        onUpdated={(t) => { onUpdated?.(t); setShowEdit(false); }}
        onClose={() => setShowEdit(false)}
      />
    </>
  );
}

// src/tasks/Task.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import TaskCard from "./task"; // <— FIXED

export default function TaskPage () {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setErr("");
      try {
        const { data } = await api.get(`/api/tasks/${id}/`);
        if (!cancelled) setTask(data);
      } catch (e) {
        if (!cancelled) {
          const msg =
            // e?.response.data?.status === 404
            //   ? "Task not found."
            //   : e?.message || "Failed to load task.";
          setErr(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleUpdated = (updated) => setTask(updated);

  const handleDelete = async (t) => {
    if (!window.confirm(`Delete "${t.title}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/api/tasks/${t.id}/`);
      navigate("/tasks");
    } catch (e) {
      alert(e?.response?.data ? JSON.stringify(e.response.data) : e?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-muted">Loading…</div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{err}</div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  if (!task) return null;

  return (
    <div className="container py-4" style={{ maxWidth: 800 }}>
      <TaskCard task={task} onUpdated={handleUpdated} onDelete={handleDelete}  />
    </div>
  );
}

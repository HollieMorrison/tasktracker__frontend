import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import TaskCard from "./task";
import CreateTaskModal from "./task.create"; 

const PRIORITY_LABELS = { 1: "Low", 2: "Medium", 3: "High", 4: "Urgent" };
function humanState(s) { if (!s) return ""; return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()); }

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [q, setQ] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [overdueFilter, setOverdueFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/tasks/");
        setTasks(Array.isArray(data) ? data : data.tasks || []);
      } catch (e) {
        console.error(e);
        setTasks([]);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return tasks.filter((t) => {
      if (query) {
        const hay = `${t.title || ""} ${t.description || ""} ${t.category__name || ""}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      if (stateFilter !== "all" && t.state !== stateFilter) return false;
      if (priorityFilter !== "all" && String(t.priority) !== String(priorityFilter)) return false;
      if (overdueFilter !== "all") {
        const isOver = !!t.is_overdue;
        if (overdueFilter === "yes" && !isOver) return false;
        if (overdueFilter === "no" && isOver) return false;
      }
      return true;
    });
  }, [tasks, q, stateFilter, priorityFilter, overdueFilter]);

  const handleUpdated = (updated) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    try {
      await api.delete(`/api/tasks/${task.id}/`);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (e) {
      alert("Failed to delete task.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="mb-0">My Tasks</h1>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>+ New Task</button>
      </div>

            {/* Simple filter bar (existing) */}
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-12 col-md-5">
              <label className="form-label">Search</label>
              <input
                className="form-control"
                placeholder="Title, description, category…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="col-6 col-md-2">
              <label className="form-label">State</label>
              <select className="form-select" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="in_progress">In progress</option>
                <option value="done">Done</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="col-6 col-md-2">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="4">Urgent</option>
                <option value="3">High</option>
                <option value="2">Medium</option>
                <option value="1">Low</option>
              </select>
            </div>

            <div className="col-6 col-md-2">
              <label className="form-label">Overdue</label>
              <select
                className="form-select"
                value={overdueFilter}
                onChange={(e) => setOverdueFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="yes">Only overdue</option>
                <option value="no">Only not overdue</option>
              </select>
            </div>

            <div className="col-6 col-md-1 d-flex align-items-end">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setQ("");
                  setStateFilter("all");
                  setPriorityFilter("all");
                  setOverdueFilter("all");
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-2 text-muted small">
            Showing <strong>{filtered.length}</strong> of {tasks.length} task{tasks.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <div className="row">
        {filtered.map((task) => (
          <div className="col-md-4 mb-3" key={task.id}>
            <TaskCard task={task} onUpdated={handleUpdated} onDelete={handleDelete} />
          </div>
        ))}
        {filtered.length === 0 && <p className="text-muted">No tasks match your filters</p>}
      </div>

      {showCreate && (
        <CreateTaskModal
          show={showCreate}
          onClose={() => setShowCreate(false)}
          onCreated={(newTask) => setTasks((prev) => [newTask, ...prev])}
        />
      )}
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClipboardList,
  FaExclamationTriangle,
} from "react-icons/fa";
import useTaskStore from "../store/tasks.jsx";

const getPriorityLabel = (priority) => {
  const value = String(priority || "").toLowerCase();
  if (value === "4") return "Urgent";
  if (value === "3") return "High";
  if (value === "2") return "Medium";
  if (value === "1") return "Low";
  return priority || "Medium";
};

const getStatusLabel = (task) => {
  const state = String(task.state || task.status || "").toLowerCase();
  if (state === "in_progress") return "In Progress";
  if (state === "done") return "Done";
  if (state === "cancelled") return "Cancelled";
  return "To Do";
};

const isDone = (task) => getStatusLabel(task) === "Done";

const formatDate = (value) => {
  if (!value) return "No due date";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "No due date" : date.toLocaleDateString();
};

const Tasks = () => {
  const navigate = useNavigate();
  const { tasks, fetchTasks, deleteTask, updateTask } = useTaskStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      `${task.title || ""} ${task.description || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const completedCount = tasks.filter(isDone).length;
  const inProgressCount = tasks.filter(
    (task) => getStatusLabel(task) === "In Progress"
  ).length;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;
    await deleteTask(id);
    alert("Task deleted successfully.");
    fetchTasks();
  };

  const handleComplete = async (task) => {
    await updateTask(task.id, { ...task, state: "done" });
    alert("Task marked as complete.");
    fetchTasks();
  };

  return (
    <div className="container py-5 page-shell">
      <div className="page-header">
        <div>
          <h1 className="page-title">Task Dashboard</h1>
          <p className="page-subtitle">
            Organise your priorities, manage deadlines, and track your progress.
          </p>
        </div>

        <Button variant="primary" onClick={() => navigate("/tasks/create")}>
          + Add Task
        </Button>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-label">Total Tasks</div>
          <p className="summary-value">{tasks.length}</p>
        </div>

        <div className="summary-card">
          <div className="summary-label">Completed</div>
          <p className="summary-value">{completedCount}</p>
        </div>

        <div className="summary-card">
          <div className="summary-label">In Progress</div>
          <p className="summary-value">{inProgressCount}</p>
        </div>
      </div>

      <div className="task-toolbar">
        <Row>
          <Col md={12}>
            <Form.Control
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </Col>
        </Row>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <FaClipboardList size={38} className="mb-3" />
          <h3>No tasks found</h3>
          <p>Create your first task to start tracking your progress.</p>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item-card">
              <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
                <div>
                  <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                    <h3 className="task-title">{task.title}</h3>

                    <span className="badge-soft badge-priority-medium">
                      <FaExclamationTriangle />
                      {getPriorityLabel(task.priority)}
                    </span>

                    <span className="badge-soft badge-status-progress">
                      <FaCheckCircle />
                      {getStatusLabel(task)}
                    </span>
                  </div>

                  <p className="task-meta mb-2">{task.description}</p>

                  <p className="task-meta mb-0">
                    <FaCalendarAlt className="me-2" />
                    {formatDate(task.due_date)}
                  </p>
                </div>

                <div className="d-flex gap-2 align-self-start">
                  {!isDone(task) && (
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleComplete(task)}
                    >
                      Complete
                    </Button>
                  )}

                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate(`/tasks/${task.id}/edit`)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;

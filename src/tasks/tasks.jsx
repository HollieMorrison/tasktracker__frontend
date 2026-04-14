import { useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaCalendarAlt, FaCheckCircle, FaClipboardList, FaExclamationTriangle } from "react-icons/fa";
import useTaskStore from "../store/tasks.jsx";

const formatDate = (value) => {
  if (!value) return "No due date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No due date";
  return date.toLocaleDateString();
};

const isOverdue = (dueDate, status) => {
  if (!dueDate || String(status).toLowerCase() === "done") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dueDate);
  date.setHours(0, 0, 0, 0);
  return date < today;
};

const getPriorityClass = (priority) => {
  switch (String(priority || "").toLowerCase()) {
    case "high":
      return "badge-soft badge-priority-high";
    case "medium":
      return "badge-soft badge-priority-medium";
    case "low":
      return "badge-soft badge-priority-low";
    default:
      return "badge-soft badge-status-todo";
  }
};

const getStatusClass = (status) => {
  switch (String(status || "").toLowerCase()) {
    case "done":
      return "badge-soft badge-status-done";
    case "in progress":
      return "badge-soft badge-status-progress";
    case "todo":
      return "badge-soft badge-status-todo";
    default:
      return "badge-soft badge-status-todo";
  }
};

const TasksPage = () => {
  const tasks = useTaskStore((state) => state.tasks || []);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter((task) =>
        `${task.title || ""} ${task.description || ""}`.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (task) => String(task.status || "").toLowerCase() === statusFilter
      );
    }

    if (priorityFilter !== "all") {
      result = result.filter(
        (task) => String(task.priority || "").toLowerCase() === priorityFilter
      );
    }

    return result;
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => String(task.status || "").toLowerCase() === "done"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => String(task.status || "").toLowerCase() === "in progress"
  ).length;
  const overdueTasks = tasks.filter((task) =>
    isOverdue(task.due_date, task.status)
  ).length;

  const handleDelete = async (taskId) => {
    if (deleteTask) {
      await deleteTask(taskId);
    }
  };

  const handleComplete = async (task) => {
    if (updateTask) {
      await updateTask(task.id, { ...task, status: "done" });
    }
  };

  return (
    <div className="container py-4 page-shell">
      <div className="page-header">
        <div>
          <h1 className="page-title">Task Dashboard</h1>
          <p className="page-subtitle">
            Organise priorities, stay on top of deadlines, and track your progress.
          </p>
        </div>

        <Button variant="primary">+ Add Task</Button>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-label">Total Tasks</div>
          <p className="summary-value">{totalTasks}</p>
        </div>

        <div className="summary-card">
          <div className="summary-label">Completed</div>
          <p className="summary-value">{completedTasks}</p>
        </div>

        <div className="summary-card">
          <div className="summary-label">In Progress</div>
          <p className="summary-value">{inProgressTasks}</p>
        </div>

        <div className="summary-card">
          <div className="summary-label">Overdue</div>
          <p className="summary-value">{overdueTasks}</p>
        </div>
      </div>

      <div className="task-toolbar">
        <Row className="g-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </Col>

          <Col md={3}>
            <Form.Select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="todo">To Do</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
            >
              <option value="all">All priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>Create a task or change your filters to see more results.</p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className="task-item-card">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
              <div className="flex-grow-1">
                <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                  <h3 className="task-title">{task.title}</h3>

                  {task.priority && (
                    <span className={getPriorityClass(task.priority)}>
                      <FaExclamationTriangle />
                      {task.priority}
                    </span>
                  )}

                  {task.status && (
                    <span className={getStatusClass(task.status)}>
                      <FaCheckCircle />
                      {task.status}
                    </span>
                  )}
                </div>

                {task.description && (
                  <p className="task-meta mb-2">{task.description}</p>
                )}

                <div className="task-meta d-flex flex-wrap gap-3">
                  <span>
                    <FaCalendarAlt className="me-2" />
                    {formatDate(task.due_date)}
                  </span>

                  {isOverdue(task.due_date, task.status) && (
                    <span className="text-danger fw-semibold">Overdue</span>
                  )}
                </div>
              </div>

              <div className="d-flex gap-2 align-self-start">
                {String(task.status || "").toLowerCase() !== "done" && (
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleComplete(task)}
                  >
                    Complete
                  </Button>
                )}

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
        ))
      )}
    </div>
  );
};

export default TasksPage;

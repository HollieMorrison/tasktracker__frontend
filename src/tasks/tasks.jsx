import { useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import TaskSummaryCards from "../components/tasks/TaskSummaryCards";
import TaskCard from "../components/tasks/TaskCard";
import EmptyState from "../components/ui/EmptyState";

import useTaskStore from "../store/tasks";

const TasksPage = () => {
  const { tasks, deleteTask, updateTask } = useTaskStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (searchTerm) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (task) => (task.status || "").toLowerCase() === statusFilter
      );
    }

    return result;
  }, [tasks, searchTerm, statusFilter]);

  const handleDelete = (task) => {
    deleteTask(task.id);
    toast.success("Task deleted");
  };

  const handleComplete = (task) => {
    updateTask(task.id, { ...task, status: "done" });
    toast.success("Task completed");
  };

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="page-title">My Tasks</h1>
          <p className="page-subtitle">
            Stay organised and manage your workload
          </p>
        </div>

        <Button variant="primary">+ Add Task</Button>
      </div>

<<<<<<< HEAD
      <div className="row">
        {filtered.map((task) => (
          <div className="col-md-4 mb-3" key={task.id}>
            <TaskCard task={task} onUpdated={handleUpdated} onDelete={handleDelete} requiresLinkToPage />
          </div>
        ))}
        {filtered.length === 0 && <p className="text-muted">No tasks match your filters</p>}
=======
      {/* SUMMARY */}
      <TaskSummaryCards tasks={tasks} />

      {/* FILTER */}
      <div className="task-toolbar">
        <Row className="g-3">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>

          <Col md={4}>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="todo">To Do</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </Form.Select>
          </Col>
        </Row>
>>>>>>> 5905e21 (Improve frontend UI and task dashboard with reusable components, filtering, and enhanced user experience)
      </div>

      {/* LIST */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          text="Create a task to get started"
        />
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className="task-card-hover">
            <TaskCard
              task={task}
              onDelete={handleDelete}
              onComplete={handleComplete}
              onEdit={(task) => console.log("edit", task)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default TasksPage;
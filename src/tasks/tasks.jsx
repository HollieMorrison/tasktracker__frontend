import { useMemo, useState } from "react";
import { Button, Card, Col, Form, Row, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import useTaskStore from "../store/tasks.jsx";

const SummaryCard = ({ title, value }) => (
  <Card className="shadow-sm border-0 rounded-4 h-100">
    <Card.Body>
      <p className="text-muted mb-1">{title}</p>
      <h3 className="mb-0 fw-bold">{value}</h3>
    </Card.Body>
  </Card>
);

const TasksPage = () => {
  const tasks = useTaskStore((state) => state.tasks || []);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (searchTerm.trim()) {
      result = result.filter((task) =>
        (task.title || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (task) => (task.status || "").toLowerCase() === statusFilter
      );
    }

    return result;
  }, [tasks, searchTerm, statusFilter]);

  const completedCount = tasks.filter(
    (task) => (task.status || "").toLowerCase() === "done"
  ).length;

  const handleDelete = async (task) => {
    try {
      if (deleteTask) {
        await deleteTask(task.id);
      }
      toast.success("Task deleted");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete task");
    }
  };

  const handleComplete = async (task) => {
    try {
      if (updateTask) {
        await updateTask(task.id, { ...task, status: "done" });
      }
      toast.success("Task completed");
    } catch (error) {
      console.error(error);
      toast.error("Could not update task");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="fw-bold mb-1">My Tasks</h1>
          <p className="text-muted mb-0">
            Stay organised and manage your workload.
          </p>
        </div>

        <Button variant="primary">+ Add Task</Button>
      </div>

      <Row className="g-3 mb-4">
        <Col md={6} xl={3}>
          <SummaryCard title="Total Tasks" value={tasks.length} />
        </Col>
        <Col md={6} xl={3}>
          <SummaryCard title="Completed" value={completedCount} />
        </Col>
      </Row>

      <Card className="shadow-sm border-0 rounded-4 mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </Col>

            <Col md={4}>
              <Form.Select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All Tasks</option>
                <option value="todo">To Do</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {filteredTasks.length === 0 ? (
        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body className="text-center py-5">
            <h3 className="fw-bold">No tasks found</h3>
            <p className="text-muted mb-0">
              Try changing your filters or create a new task.
            </p>
          </Card.Body>
        </Card>
      ) : (
        filteredTasks.map((task) => (
          <Card key={task.id} className="shadow-sm border-0 rounded-4 mb-3">
            <Card.Body>
              <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
                    <h5 className="mb-0 fw-semibold">{task.title}</h5>

                    {task.status && (
                      <Badge bg={task.status === "done" ? "success" : "secondary"}>
                        {task.status}
                      </Badge>
                    )}
                  </div>

                  {task.description && (
                    <p className="text-muted mb-2">{task.description}</p>
                  )}
                </div>

                <div className="d-flex gap-2 align-self-start">
                  {(task.status || "").toLowerCase() !== "done" && (
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleComplete(task)}
                    >
                      Done
                    </Button>
                  )}

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(task)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default TasksPage;

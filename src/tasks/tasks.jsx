import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useTaskStore from "../store/tasks";

const Tasks = () => {
  const navigate = useNavigate();
  const { tasks, fetchTasks, deleteTask, updateTask } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    await deleteTask(id);
    fetchTasks();
  };

  const handleComplete = async (task) => {
    await updateTask(task.id, { ...task, state: "done" });
    fetchTasks();
  };

  return (
    <div className="container mt-4">
      <h1>Task Dashboard</h1>

      <button onClick={() => navigate("/tasks/create")}>
        + Add Task
      </button>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} style={{ marginTop: "20px" }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <button onClick={() => handleComplete(task)}>
              Complete
            </button>

            <button onClick={() => navigate(`/tasks/${task.id}/edit`)}>
              Edit
            </button>

            <button onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Tasks;

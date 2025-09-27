import { useEffect, useState } from "react"
export default function TaskList() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/superuser/tasks/", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setTasks(data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Tasks</h1>

      <div className="row">
        {tasks.map((task) => (
          <div className="col-md-4 mb-3" key={task.id}>
            <div className={`card shadow-sm border-${task.is_overdue ? "danger" : "secondary"}`}>
              <div className="card-body">
                <h5 className="card-title text-capitalize">
                  {task.title}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Category: {task.category__name || "Uncategorized"}
                </h6>
                <p className="card-text">
                  <strong>State:</strong> {task.state}<br />
                  <strong>Priority:</strong> {task.priority}<br />
                  <strong>Due:</strong>{" "}
                  {task.due_date ? new Date(task.due_date).toLocaleString() : "No due date"}<br />
                  <strong>Overdue:</strong>{" "}
                  {task.is_overdue ? (
                    <span className="badge bg-danger">Yes</span>
                  ) : (
                    <span className="badge bg-success">No</span>
                  )}
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Created by {task.created_by__username} on{" "}
                    {new Date(task.created_at).toLocaleDateString()}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="text-muted">No tasks available</p>
        )}
      </div>
    </div>
  )
}

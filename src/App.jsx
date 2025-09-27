
import './App.css'
import Tasks from './tasks/tasks'
import LoginPage from './social/login'
import { Routes, Route, Link } from "react-router-dom"

function App() {

  return (
    <div>
        <nav>
          <Link to="/" className="me-3">Home</Link>
          <Link to="/tasks" className="me-3">Tasks</Link>
          <Link to="/login"> login </Link>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tasks" element={ <Tasks /> } />
        </Routes>
     
    </div>
  )
}

export default App;
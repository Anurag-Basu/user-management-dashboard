import { BrowserRouter, Link } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.tsx'

function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <h1>User Management Dashboard</h1>
        <nav className="app-nav">
          <Link to="/">Dashboard</Link>
          <Link to="/users/new">Create User</Link>
        </nav>
      </header>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

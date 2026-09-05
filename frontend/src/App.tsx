import { BrowserRouter, NavLink } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.tsx'

function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <h1>User Management Dashboard</h1>
        <nav className="app-nav">
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/users/new">Create User</NavLink>
        </nav>
      </header>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

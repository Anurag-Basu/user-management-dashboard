import { Route, Routes } from 'react-router-dom'
import CreateUser from '../pages/CreateUser.tsx'
import Dashboard from '../pages/Dashboard.tsx'
import EditUser from '../pages/EditUser.tsx'
import UserDetails from '../pages/UserDetails.tsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users/new" element={<CreateUser />} />
      <Route path="/users/:id" element={<UserDetails />} />
      <Route path="/users/:id/edit" element={<EditUser />} />
    </Routes>
  )
}

export default AppRoutes

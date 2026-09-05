import { useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm.tsx'
import { createUser } from '../services/users.ts'
import type { UserInput } from '../types/user.ts'

function CreateUser() {
  const navigate = useNavigate()

  async function handleSubmit(values: UserInput) {
    await createUser(values)
    navigate('/')
  }

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>Create User</h2>
          <p className="muted">Add a new user to the dashboard.</p>
        </div>
      </div>

      <section className="card">
        <UserForm
          submitLabel="Create user"
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')}
        />
      </section>
    </main>
  )
}

export default CreateUser

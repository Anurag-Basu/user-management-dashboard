import { Link, useNavigate, useParams } from 'react-router-dom'
import UserForm from '../components/UserForm.tsx'
import { useUser } from '../hooks/useUser.ts'
import { updateUser } from '../services/users.ts'
import { getUserId, toUserInput, type UserInput } from '../types/user.ts'

function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, loading, error } = useUser(id)

  async function handleSubmit(values: UserInput) {
    if (!id) {
      return
    }

    const updated = await updateUser(id, values)
    navigate(`/users/${getUserId(updated) || id}`)
  }

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>Edit User</h2>
          <p className="muted">Update this user's details.</p>
        </div>
      </div>

      <section className="card">
        {loading ? <p className="empty-state">Loading user...</p> : null}
        {error ? (
          <>
            <p className="status-banner error">{error}</p>
            <div className="form-actions">
              <Link className="btn btn-secondary" to="/">
                Back to dashboard
              </Link>
            </div>
          </>
        ) : null}

        {user ? (
          <UserForm
            key={getUserId(user)}
            initialValues={toUserInput(user)}
            submitLabel="Save changes"
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/users/${getUserId(user)}`)}
          />
        ) : null}
      </section>
    </main>
  )
}

export default EditUser

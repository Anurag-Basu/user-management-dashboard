import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog.tsx'
import UserList from '../components/UserList.tsx'
import { useUsers } from '../hooks/useUsers.ts'
import { deleteUser } from '../services/users.ts'
import type { User } from '../types/user.ts'
import { getUserId } from '../types/user.ts'
import { getErrorMessage } from '../utils/errors.ts'

function Dashboard() {
  const { users, loading, error, refetch } = useUsers()
  const [query, setQuery] = useState('')
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const filteredUsers = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) {
      return users
    }

    return users.filter((user) =>
      [user.name, user.email, user.phone, user.company, user.address?.city]
        .filter((value): value is string => Boolean(value))
        .some((value) => value.toLowerCase().includes(term)),
    )
  }, [users, query])

  async function handleConfirmDelete() {
    if (!userToDelete) {
      return
    }

    setDeleting(true)
    setActionError(null)

    try {
      await deleteUser(getUserId(userToDelete))
      setUserToDelete(null)
      await refetch()
    } catch (err) {
      setActionError(getErrorMessage(err))
    } finally {
      setDeleting(false)
    }
  }

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p className="muted">View, search, and manage users.</p>
        </div>
        <Link className="btn btn-primary" to="/users/new">
          Add user
        </Link>
      </div>

      <section className="card">
        <div className="toolbar">
          <label className="search-field">
            <span className="visually-hidden">Search users</span>
            <input
              type="search"
              value={query}
              placeholder="Search by name, email, phone, company, or city"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <p className="muted count">
            {loading ? 'Loading...' : `${filteredUsers.length} of ${users.length} users`}
          </p>
        </div>

        {error ? <p className="status-banner error">{error}</p> : null}
        {actionError ? <p className="status-banner error">{actionError}</p> : null}

        {loading ? (
          <p className="empty-state">Loading users...</p>
        ) : !error && users.length === 0 ? (
          <p className="empty-state">No users yet. Create the first one to get started.</p>
        ) : !error ? (
          <UserList users={filteredUsers} onDelete={setUserToDelete} />
        ) : null}
      </section>

      <ConfirmDialog
        open={Boolean(userToDelete)}
        title="Delete user"
        message={
          userToDelete
            ? `Delete ${userToDelete.name}? This cannot be undone.`
            : ''
        }
        loading={deleting}
        onConfirm={() => {
          void handleConfirmDelete()
        }}
        onCancel={() => {
          if (!deleting) {
            setUserToDelete(null)
          }
        }}
      />
    </main>
  )
}

export default Dashboard

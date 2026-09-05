import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog.tsx'
import Pagination from '../components/Pagination.tsx'
import UserList from '../components/UserList.tsx'
import { useUsers } from '../hooks/useUsers.ts'
import { deleteUser } from '../services/users.ts'
import type { User } from '../types/user.ts'
import { getUserId } from '../types/user.ts'
import { getErrorMessage } from '../utils/errors.ts'

const PAGE_SIZE = 10

function Dashboard() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [page, setPage] = useState(1)
  const { users, total, totalPages, loading, error, refetch } = useUsers({
    page,
    limit: PAGE_SIZE,
    query: debouncedQuery,
  })
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedQuery(query.trim())
    }, 300)

    return () => window.clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    setPage(1)
  }, [debouncedQuery])

  useEffect(() => {
    if (!loading && totalPages > 0 && page > totalPages) {
      setPage(totalPages)
    }
  }, [loading, page, totalPages])

  const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, total)

  async function handleConfirmDelete() {
    if (!userToDelete) {
      return
    }

    setDeleting(true)
    setActionError(null)

    try {
      await deleteUser(getUserId(userToDelete))
      setUserToDelete(null)

      if (users.length === 1 && page > 1) {
        setPage(page - 1)
      } else {
        await refetch()
      }
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
            {loading
              ? 'Loading...'
              : total === 0
                ? '0 users'
                : `Showing ${rangeStart}-${rangeEnd} of ${total} users`}
          </p>
        </div>

        {error ? <p className="status-banner error">{error}</p> : null}
        {actionError ? <p className="status-banner error">{actionError}</p> : null}

        {loading ? (
          <p className="empty-state">Loading users...</p>
        ) : !error && total === 0 && !debouncedQuery ? (
          <p className="empty-state">No users yet. Create the first one to get started.</p>
        ) : !error ? (
          <>
            <UserList users={users} onDelete={setUserToDelete} />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
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

import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog.tsx'
import { useUser } from '../hooks/useUser.ts'
import { deleteUser } from '../services/users.ts'
import { getUserId } from '../types/user.ts'
import { getErrorMessage } from '../utils/errors.ts'

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div className="detail">
      <dt>{label}</dt>
      <dd>{value || '—'}</dd>
    </div>
  )
}

function UserDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, loading, error } = useUser(id)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  async function handleConfirmDelete() {
    if (!user) {
      return
    }

    setDeleting(true)
    setActionError(null)

    try {
      await deleteUser(getUserId(user))
      navigate('/')
    } catch (err) {
      setActionError(getErrorMessage(err))
      setDeleting(false)
    }
  }

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>User Details</h2>
          <p className="muted">Full profile for this user.</p>
        </div>
        {user ? (
          <div className="page-actions">
            <Link className="btn btn-secondary" to={`/users/${getUserId(user)}/edit`}>
              Edit
            </Link>
            <button type="button" className="btn btn-danger" onClick={() => setConfirmOpen(true)}>
              Delete
            </button>
          </div>
        ) : null}
      </div>

      <section className="card">
        {loading ? <p className="empty-state">Loading user...</p> : null}
        {error ? <p className="status-banner error">{error}</p> : null}
        {actionError ? <p className="status-banner error">{actionError}</p> : null}

        {user ? (
          <dl className="details-grid">
            <Detail label="Name" value={user.name} />
            <Detail label="Email" value={user.email} />
            <Detail label="Phone" value={user.phone} />
            <Detail label="Company" value={user.company} />
            <Detail label="Street" value={user.address?.street} />
            <Detail label="City" value={user.address?.city} />
            <Detail label="Zip code" value={user.address?.zipcode} />
            <Detail label="Latitude" value={user.address?.geo?.lat} />
            <Detail label="Longitude" value={user.address?.geo?.lng} />
          </dl>
        ) : null}

        <div className="form-actions">
          <Link className="btn btn-secondary" to="/">
            Back to dashboard
          </Link>
        </div>
      </section>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete user"
        message={user ? `Delete ${user.name}? This cannot be undone.` : ''}
        loading={deleting}
        onConfirm={() => {
          void handleConfirmDelete()
        }}
        onCancel={() => {
          if (!deleting) {
            setConfirmOpen(false)
          }
        }}
      />
    </main>
  )
}

export default UserDetails

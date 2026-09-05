import { Link } from 'react-router-dom'
import type { User } from '../types/user.ts'
import { getUserId } from '../types/user.ts'

type UserListProps = {
  users: User[]
  onDelete: (user: User) => void
}

function UserList({ users, onDelete }: UserListProps) {
  if (users.length === 0) {
    return <p className="empty-state">No users match your search.</p>
  }

  return (
    <div className="table-wrap">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const id = getUserId(user)
            return (
              <tr key={id}>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Phone">{user.phone}</td>
                <td data-label="Company">{user.company}</td>
                <td data-label="City">{user.address?.city ?? '—'}</td>
                <td data-label="Actions">
                  <div className="row-actions">
                    <Link className="btn btn-secondary btn-small" to={`/users/${id}`}>
                      View
                    </Link>
                    <Link className="btn btn-secondary btn-small" to={`/users/${id}/edit`}>
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-small"
                      onClick={() => onDelete(user)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserList

import { useCallback, useEffect, useState } from 'react'
import { fetchUsers } from '../services/users.ts'
import type { User } from '../types/user.ts'
import { getErrorMessage } from '../utils/errors.ts'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setUsers([])
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { users, loading, error, refetch }
}

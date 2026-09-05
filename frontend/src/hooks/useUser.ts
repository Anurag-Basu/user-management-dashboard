import { useCallback, useEffect, useState } from 'react'
import { fetchUser } from '../services/users.ts'
import type { User } from '../types/user.ts'
import { getErrorMessage } from '../utils/errors.ts'

export function useUser(id: string | undefined) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(Boolean(id))
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    if (!id) {
      setUser(null)
      setError('User id is missing')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await fetchUser(id)
      setUser(data)
    } catch (err) {
      setUser(null)
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { user, loading, error, refetch }
}

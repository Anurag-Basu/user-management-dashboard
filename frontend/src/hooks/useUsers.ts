import { useCallback, useEffect, useState } from 'react'
import { fetchUsers } from '../services/users.ts'
import type { User } from '../types/user.ts'
import { getErrorMessage } from '../utils/errors.ts'

type UseUsersOptions = {
  page: number
  limit: number
  query: string
}

export function useUsers({ page, limit, query }: UseUsersOptions) {
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchUsers({ page, limit, q: query })
      setUsers(data.users)
      setTotal(data.total)
      setTotalPages(data.totalPages)
    } catch (err) {
      setUsers([])
      setTotal(0)
      setTotalPages(0)
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [page, limit, query])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { users, total, totalPages, loading, error, refetch }
}

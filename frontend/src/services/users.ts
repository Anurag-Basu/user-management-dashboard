import type { User, UserInput } from '../types/user.ts'
import { api } from './api.ts'

function unwrapUser(data: User | { user: User }): User {
  if ('user' in data) {
    return data.user
  }

  return data
}

export type UsersPage = {
  users: User[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export async function fetchUsers(params: {
  page?: number
  limit?: number
  q?: string
} = {}): Promise<UsersPage> {
  const { data } = await api.get<User[] | UsersPage>('/users', {
    params: {
      page: params.page,
      limit: params.limit,
      q: params.q || undefined,
    },
  })

  if (Array.isArray(data)) {
    return {
      users: data,
      total: data.length,
      page: 1,
      limit: data.length || 1,
      totalPages: data.length > 0 ? 1 : 0,
    }
  }

  return data
}

export async function fetchUser(id: string): Promise<User> {
  const { data } = await api.get<User | { user: User }>(`/users/${id}`)
  return unwrapUser(data)
}

export async function createUser(payload: UserInput): Promise<User> {
  const { data } = await api.post<User | { user: User }>('/users', payload)
  return unwrapUser(data)
}

export async function updateUser(id: string, payload: UserInput): Promise<User> {
  const { data } = await api.put<User | { user: User }>(`/users/${id}`, payload)
  return unwrapUser(data)
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`)
}
